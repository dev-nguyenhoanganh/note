import { SyntheticEvent } from 'react';
import { styled } from '@mui/material/styles';
import { FormControlLabel, Box, Typography, BoxProps } from '@mui/material';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { useFormContext, Controller } from 'react-hook-form';
import { CheckboxValue } from '@/utils/constants';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

interface StatusLabel {
  active: string;
  disabled: string;
}

interface SwitchIOSProps extends BoxProps {
  name: string;
  label?: string;
  statusLabel?: StatusLabel;
}

const SwitchIOS = ({ name, label, statusLabel, sx }: SwitchIOSProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Box sx={sx}>
          <Typography>{label}</Typography>
          <FormControlLabel
            sx={{ flexDirection: 'row-reverse', margin: 0 }}
            onChange={(e: SyntheticEvent<Element, Event>) => {
              const newValue = (e.target as HTMLInputElement).checked ? CheckboxValue.Checked : CheckboxValue.Uncheck;
              onChange(newValue);
            }}
            label={!statusLabel ? undefined : value ? statusLabel.active : statusLabel.disabled}
            control={<IOSSwitch sx={{ m: 1 }} checked={Boolean(value)} />}
          />
        </Box>
      )}
    />
  );
};

export default SwitchIOS;

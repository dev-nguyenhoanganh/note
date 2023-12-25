import React, { useState, MouseEvent } from 'react';
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
  useTheme,
  alpha,
} from '@mui/material';
import { useSnackbar } from 'notistack';

import { Theme } from '@/types';

// Redux
import { logout } from '@/store/auth';
import { useAppSelector, useAppDispatch } from '@/store/hook';
import { RootState } from '@/store';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  // ----------- React Hook ------------------
  const theme: Theme = useTheme();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { enqueueSnackbar: openSnackbar } = useSnackbar();

  // ----------- State declare ---------------
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const [loading, setLoading] = useState(false);

  // ----------- Handle change state ---------------
  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    try {
      if (loading) {
        return;
      }

      setLoading(true);
      setOpen(null);
      const { type } = await dispatch(logout(user.id));

      if (type.endsWith('fulfilled')) {
        location.reload();
      }
    } catch (e) {
      openSnackbar((e as Error).message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleOpen} sx={{ p: 0 }}>
        <Avatar src={user.photoUrl || ''} alt="photoUrl" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 220,
            boxShadow: theme.customShadows.dropdown,
            backgroundColor: alpha(
              theme.palette.background.paper,
              theme.palette.mode === 'dark' ? 0.1 : 0.8,
            ),
            backdropFilter: 'blur(135px)',
            '& .MuiMenuItem-root': {
              typography: 'typography.body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, pl: 2.5, pr: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {user.displayName || ''}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </React.Fragment>
  );
}

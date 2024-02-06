import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Button, Typography, Box } from '@mui/material';
// Localization message
import { FormattedMessage } from 'react-intl';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  borderRadius: theme.spacing(4),
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(4, 8),
  backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.1 : 0.8),
  backdropFilter: 'blur(135px)',
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Box
        sx={{
          background: 'center/cover no-repeat url("/assets/Trees sprouted.jpg")',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            <FormattedMessage id="page404.heading" />
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            <FormattedMessage id="page404.message" />
          </Typography>

          <Box
            component="img"
            src="/assets/illustrations/illustration_404.svg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </StyledContent>
      </Box>
    </>
  );
}

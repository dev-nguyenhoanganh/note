// import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled, alpha, Theme } from '@mui/material/styles';
import { Box } from '@mui/material';
// Localization message
import { AppWebsiteVisits } from '@/sections/@dashboard/app';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  width: 800,
  borderRadius: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
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
          {/* <Typography variant="h3" paragraph>
            <FormattedMessage id="page404.heading" />
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            <FormattedMessage id="page404.message" />
          </Typography>

          <Box
            component="img"
            src="/assets/illustrations/illustration_404.svg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          /> */}

          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            sx={(theme: Theme) => ({
              backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.1 : 0.8),
              backdropFilter: 'blur(135px)',
              width: '100%',
            })}
            chartLabels={['', '30 tuổi', '15 tuổi', '2027', '2031', '']}
            chartData={[
              // {
              //   name: 'Team A',
              //   type: 'rangeBar',
              //   data: {
              //     x: '2024',
              //     y: [44, 44],
              //   },
              // },
              {
                name: 'Person A',
                type: 'line',
                data: [20, 20, 66, 30, 90, null],
              },
              // {
              //   name: 'Person B',
              //   type: 'line',
              //   fill: 'solid',
              //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
              // },
            ]}
          />
        </StyledContent>
      </Box>
    </>
  );
}

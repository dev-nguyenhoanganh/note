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

export default function BloodReport() {
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
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            sx={(theme: Theme) => ({
              backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.1 : 0.8),
              backdropFilter: 'blur(135px)',
              width: '100%',
            })}
            chartLabels={['', '30歳', '40歳', '70歳', '']}
            chartData={[
              {
                name: '山本さま',
                type: 'line',
                data: [
                  {
                    x: '',
                    y: null,
                  },
                  {
                    x: '30歳',
                    y: 20,
                  },
                  {
                    x: '40歳',
                    y: 50,
                  },
                  {
                    x: '70歳',
                    y: 70,
                  },
                  {
                    x: '',
                    y: null,
                  },
                ],
              },
              {
                name: 'Team A',
                type: 'rangeBar',
                data: [
                  {
                    x: '',
                    y: null,
                  },
                  {
                    x: '30歳',
                    y: [10, 60],
                  },
                  {
                    x: '40歳',
                    y: [10, 70],
                  },
                  {
                    x: '70歳',
                    y: [10, 80],
                  },
                  {
                    x: '',
                    y: null,
                  },
                ],
              },
              // {
              //   name: 'Person B',
              //   type: 'area',
              //   data: [
              //     {
              //       x: '',
              //       y: null,
              //     },
              //     {
              //       x: '30歳',
              //       y: 60,
              //     },
              //     {
              //       x: '40歳',
              //       y: 70,
              //     },
              //     {
              //       x: '70歳',
              //       y: 80,
              //     },
              //     {
              //       x: '',
              //       y: null,
              //     },
              //   ],
              // },
            ]}
          />
        </StyledContent>
      </Box>
    </>
  );
}

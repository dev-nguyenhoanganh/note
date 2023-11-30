import React from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';
import { useIntl } from 'react-intl';
// // @mui
// import { styled, useTheme, alpha } from '@mui/material/styles';
// import { Typography, Divider, Stack, Button, Box, Paper } from '@mui/material';
// import { useSnackbar } from 'notistack';

// // hooks
// import useResponsive from '@/hook/useResponsive';
// // import { useAppDispatch } from '@/store/hook';
// // components
// import { Iconify } from '@/components/iconify';
// import LazyImage from '@/components/lazy-image';
// // sections
// import { LoginForm } from '../sections/auth/login';
// import { Theme } from '@/types';

// ----------------------------------------------------------------------

// const StyledContainer = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   height: '100%',

//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100vw',
//     height: '100vh',
//     background: 'center/cover no-repeat url("/assets/Trees sprouted.jpg")',
//     zIndex: '-1',
//     opacity: theme.palette.mode === 'dark' ? 0.5 : 1,
//   },
//   [theme.breakpoints.down('md')]: {
//     padding: theme.spacing(2),
//   },
// }));

// const StyledForm = styled(Paper)(({ theme }) => ({
//   margin: 'auto',
//   backgroundImage: 'none',
//   overflow: 'hidden',
//   position: 'relative',
//   borderRadius: '16px',
//   zIndex: 0,
//   padding: theme.spacing(6, 3),
//   backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.1 : 0.8),
//   backdropFilter: 'blur(135px)',
// }));

// const StyledSection = styled('div')(({ theme }: { theme: Theme }) => ({
//   width: '100%',
//   maxWidth: 500,
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   boxShadow: theme.customShadows.card,
//   backgroundColor: theme.palette.background.default,
//   padding: theme.spacing(3),

//   [theme.breakpoints.down('lg')]: {
//     margin: 'auto',
//     borderRadius: '16px',
//     backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.1 : 0.8),
//     backdropFilter: 'blur(135px)',
//   },
// }));

// const StyledContent = styled('div')(() => ({
//   maxWidth: 480,
//   margin: 'auto',
//   display: 'flex',
//   justifyContent: 'center',
//   flexDirection: 'column',
// }));

// ----------------------------------------------------------------------

// const paralax = () => {
//   // ------------- VARIABLES ------------- //
//   let ticking = false;
//   const isFirefox = /Firefox/i.test(navigator.userAgent);
//   const isIe = /MSIE/i.test(navigator.userAgent) || /Trident.*rv\:11\./i.test(navigator.userAgent);
//   const scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
//   const slideDurationSetting = 600; //Amount of time for which slide is "locked"
//   let currentSlideNumber = 0;
//   const totalSlideNumber = document.querySelectorAll('.background').length;
//   let delta: number;

//   // ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
//   function parallaxScroll(evt) {
//     if (isFirefox) {
//       //Set delta for Firefox
//       delta = evt.detail * -120;
//     } else if (isIe) {
//       //Set delta for IE
//       delta = -evt.deltaY;
//     } else {
//       //Set delta for all other browsers
//       delta = evt.wheelDelta;
//     }

//     if (ticking != true) {
//       if (delta <= -scrollSensitivitySetting) {
//         //Down scroll
//         ticking = true;
//         if (currentSlideNumber !== totalSlideNumber - 1) {
//           currentSlideNumber++;
//           nextItem();
//         }
//         slideDurationTimeout(slideDurationSetting);
//       }
//       if (delta >= scrollSensitivitySetting) {
//         //Up scroll
//         ticking = true;
//         if (currentSlideNumber !== 0) {
//           currentSlideNumber--;
//         }
//         previousItem();
//         slideDurationTimeout(slideDurationSetting);
//       }
//     }
//   }

//   // ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
//   function slideDurationTimeout(slideDuration) {
//     setTimeout(function () {
//       ticking = false;
//     }, slideDuration);
//   }

//   // ------------- ADD EVENT LISTENER ------------- //
//   const mousewheelEvent = isFirefox ? 'DOMMouseScroll' : 'wheel';
//   window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

//   // ------------- SLIDE MOTION ------------- //
//   function nextItem() {
//     const $previousSlide = $('.background').eq(currentSlideNumber - 1);
//     $previousSlide.removeClass('up-scroll').addClass('down-scroll');
//   }

//   function previousItem() {
//     const $currentSlide = $('.background').eq(currentSlideNumber);
//     $currentSlide.removeClass('down-scroll').addClass('up-scroll');
//   }
// };

const helmetData = new HelmetData({});

export default function HomePage() {
  // const upLg = useResponsive('up', 'lg');
  // const theme: Theme = useTheme();
  const { formatMessage } = useIntl();

  // const { enqueueSnackbar: openSnackbar } = useSnackbar();

  // const showMaintainMessage = () => {
  //   openSnackbar(formatMessage({ id: 'notice.maintain' }), { variant: 'warning' });
  // };

  return (
    <React.Fragment>
      <Helmet helmetData={helmetData}>
        <title>{formatMessage({ id: 'homePage.title' })}</title>
      </Helmet>

      <div className="container">
        <section className="background">
          <div className="content-wrapper">
            <p className="content-title">Full Page Parallax Effect</p>
            <p className="content-subtitle">Scroll down and up to see the effect!</p>
          </div>
        </section>
        <section className="background">
          <div className="content-wrapper">
            <p className="content-title">Cras lacinia non eros nec semper.</p>
            <p className="content-subtitle">
              Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras ut massa
              mattis nibh semper pretium.
            </p>
          </div>
        </section>
        <section className="background">
          <div className="content-wrapper">
            <p className="content-title">Etiam consequat lectus.</p>
            <p className="content-subtitle">
              Nullam tristique urna sed tellus ornare congue. Etiam vitae erat at nibh aliquam dapibus.
            </p>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}

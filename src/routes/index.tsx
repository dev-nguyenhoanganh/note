import { useEffect, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSnackbar } from 'notistack';

// layouts
import ProtectRoutes from '@/components/layouts/ProtectRoutes';
import SimpleLayout from '@/components/layouts/SimpleLayout';

// Pages
const HomePage = lazy(() => import('@/pages/HomePage'));
// import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import Page404 from '@/pages/Page404';
import NewPassword from '@/pages/NewPassword';
import ResetPassword from '@/pages/ResetPassword';

// URL
import { URL_MAPPING } from './urlMapping';

// Redux store
import { useAppDispatch } from '@/store/hook';
import { loadToken } from '@/store/auth';

// ----------------------------------------------------------------------

export default function Router() {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar: openSnackbar } = useSnackbar();

  useEffect(() => {
    try {
      dispatch(loadToken());
    } catch (e) {
      openSnackbar((e as Error).message, { variant: 'error' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path={URL_MAPPING.LOGIN} element={<LoginPage />} />
      <Route path={URL_MAPPING.RESET_PASSWORD} element={<ResetPassword />} />
      <Route path={URL_MAPPING.NEW_PASSWORD} element={<NewPassword />} />

      <Route path={URL_MAPPING.ROOT} element={<ProtectRoutes />}>
        <Route path={URL_MAPPING.ROOT} element={<HomePage />} />
        <Route path={URL_MAPPING.DASHBOARD} element={<HomePage />} />
      </Route>

      <Route path={URL_MAPPING.ROOT} element={<SimpleLayout />}>
        <Route path={URL_MAPPING.PAGE_404} element={<Page404 />} />
        <Route path="/*" element={<Navigate to={URL_MAPPING.PAGE_404} />} />
      </Route>
    </Routes>
  );
}

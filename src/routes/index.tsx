import { Navigate, Route, Routes } from 'react-router-dom';

// layouts
// import ProtectRoutes from '@/components/layouts/ProtectRoutes';
import SimpleLayout from '@/components/layouts/SimpleLayout';

// Pages
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import Page404 from '@/pages/Page404';

// URL
import { URL_MAPPING } from './urlMapping';

// ----------------------------------------------------------------------

export default function Router() {
  return (
    <Routes>
      {/* <Route path={URL_MAPPING.ROOT} element={<HomePage />} /> */}
      <Route path={URL_MAPPING.ROOT} element={<LoginPage />} />
      <Route path={URL_MAPPING.LOGIN} element={<LoginPage />} />

      {/* <Route path={URL_MAPPING.ROOT} element={<ProtectRoutes />}>
        <Route path={URL_MAPPING.ROOT} element={<HomePage />} />
      </Route> */}
      <Route path={URL_MAPPING.ROOT} element={<SimpleLayout />}>
        <Route path={URL_MAPPING.PAGE_404} element={<Page404 />} />
        <Route path="/*" element={<Navigate to={URL_MAPPING.PAGE_404} />} />
      </Route>
    </Routes>
  );
}

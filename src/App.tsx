import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { PrivateRoute } from './routes/PrivateRoute';
import { PublicRoute } from './routes/PublicRoute';

import { LayoutAuth } from './layout/LayoutAuth';
import { LayoutCommon } from './layout/LayoutCommon';

import { Home } from './features/home/Home';
import { Login } from './features/authentication/login/Login';
import { SignUp } from './features/authentication/signup/SignUp';
import { Overview } from './features/overview/Overview';
import { Calendar } from './features/calendar/Calendar';
import { Tasks } from './features/tasks/Tasks';
import { Loader } from './components/common/Loader';
import { Settings } from './features/settings/Settings';
import { ErrorPage } from './features/error/ErrorPage';
import { LayoutError } from './layout/LayoutError';

export function App () {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>

          <Routes>
            <Route element={<LayoutAuth />}>
              <Route path={AppRoutes.LOGIN} element={<PublicRoute><Login /></PublicRoute>} />
              <Route path={AppRoutes.SIGN_UP} element={<PublicRoute><SignUp /></PublicRoute>} />
            </Route>

            <Route element={<LayoutCommon />}>
              <Route path={AppRoutes.HOME} element={<PublicRoute><Home /></PublicRoute>} />
              <Route path={AppRoutes.OVERVIEW} element={<PrivateRoute><Overview /></PrivateRoute>} />
              <Route path={AppRoutes.CALENDAR} element={<PrivateRoute><Calendar /></PrivateRoute>} />
              <Route path={AppRoutes.TASKS} element={<PrivateRoute><Tasks /></PrivateRoute>} />
              <Route path={AppRoutes.SETTINGS} element={<PrivateRoute><Settings /></PrivateRoute>} />
            </Route>

            <Route element={<LayoutError />}>
              <Route path={AppRoutes.ERROR_PAGE} element={<PrivateRoute><ErrorPage /></PrivateRoute>}/>
              <Route path="*" element={<Navigate to={AppRoutes.ERROR_PAGE} />} />
            </Route>

          </Routes>

        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};













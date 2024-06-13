import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './features/home/Home';
import { Login } from './features/authentication/login/Login';
import { SignUp } from './features/authentication/signup/SignUp';
import { Overview } from './features/overview/Overview';
import { Calendar } from './features/calendar/Calendar';
import { Tasks } from './features/tasks/Tasks';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { PrivateRoute } from './routes/PrivateRoute';
import { LayoutAuth } from './layout/LayoutAuth';
import { LayoutCommon } from './layout/LayoutCommon';

export function App () {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutAuth />}>
            <Route path={AppRoutes.HOME} element={<Home />} />
            <Route path={AppRoutes.LOGIN} element={<Login />} />
            <Route path={AppRoutes.SIGN_UP} element={<SignUp />} />
          </Route>

          <Route element={<LayoutCommon />}>
            <Route element={<PrivateRoute />}>
              <Route path={AppRoutes.OVERVIEW} element={<Overview />} />
              <Route path={AppRoutes.CALENDAR} element={<Calendar />} />
              <Route path={AppRoutes.TASKS} element={<Tasks />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};












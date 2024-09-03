import { Suspense } from 'react';
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
import { CalendarPage } from './features/calendar/CalendarPage';
import { Tasks } from './features/tasks/Tasks';
import { Projects } from './features/projects/Projects';
import { Loader } from './components/common/Loader';
import { Settings } from './features/settings/Settings';
import { ErrorPage } from './components/error/ErrorPage';
import { LayoutError } from './layout/LayoutError';
import { ErrorBackendDownPage } from './components/error/ErrorBackendDownPage';

import ErrorBoundary from './components/error/ErrorBoundary';
import CalendarExample from './features/calendar/CalendarExample';

import './App.scss';

export function App () {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
    
          <Routes>

            <Route element={<LayoutAuth />}>
              <Route path={AppRoutes.LOGIN} element={ 
                <ErrorBoundary>
                  <PublicRoute><Login /></PublicRoute>
                </ErrorBoundary>
              } />
              <Route path={AppRoutes.SIGN_UP} element={
                <ErrorBoundary>
                  <PublicRoute><SignUp /></PublicRoute>
                </ErrorBoundary>
              }/>
            </Route>

            <Route element={<LayoutCommon />}>
              <Route path={AppRoutes.HOME} element={
                <ErrorBoundary>
                  <PublicRoute><Home /></PublicRoute>
                </ErrorBoundary>                
                }
              />

              <Route path={AppRoutes.OVERVIEW} element={
                <ErrorBoundary>               
                  <PrivateRoute><Overview /></PrivateRoute>
                </ErrorBoundary>                
                }
              />

              <Route path={AppRoutes.CALENDAR} element={
                <ErrorBoundary>                
                  <PrivateRoute><CalendarPage /></PrivateRoute>
                </ErrorBoundary>                
                } 
              />

              <Route path={AppRoutes.TASKS} element={
                <ErrorBoundary>
                  <PrivateRoute><Tasks /></PrivateRoute>
                </ErrorBoundary>                
                }
              />

              <Route path={AppRoutes.PROJECTS} element={
                <ErrorBoundary>
                  <PrivateRoute><Projects /></PrivateRoute>
                </ErrorBoundary>                
                }
              />

              <Route path={AppRoutes.SETTINGS} element={
                <ErrorBoundary>
                  <PrivateRoute><Settings /></PrivateRoute>
                </ErrorBoundary>                
                }
              />

              <Route path={AppRoutes.COLOURS} element={
                <ErrorBoundary>
                  <PrivateRoute><CalendarExample /></PrivateRoute>
                </ErrorBoundary>                
                }
              /> 

            </Route>

            <Route element={<LayoutError />}>
              <Route path={AppRoutes.ERROR_PAGE} element={<PublicRoute><ErrorPage /></PublicRoute>}/>
              <Route path="*" element={<Navigate to={AppRoutes.ERROR_PAGE} />} />
              <Route path={AppRoutes.ERROR_SERVER_PAGE} element={<PublicRoute><ErrorBackendDownPage /></PublicRoute>}/>
            </Route>

          </Routes>
  
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};













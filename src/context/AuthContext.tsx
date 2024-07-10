import React, { createContext, useReducer, useContext, ReactNode, useEffect, useCallback } from 'react';
import { fetchCurrentUser } from '../api/AuthApi';
import { UserModel } from '../models/UserModel';

type User = UserModel;

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  loading: boolean;
};

type AuthAction = 
  | { type: 'LOGIN'; token: string; user: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; user: User }
  | { type: 'SET_LOADING'; loading: boolean };

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  loading: true
};

interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  handleLogout: () => void;
  handleLogin: (token: string, user: User) => void;
}

const AuthContext = createContext<AuthContextType>({
  state: initialState,
  dispatch: () => null,
  handleLogout: () => {},
  handleLogin: () => {}
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.token);
      localStorage.setItem('user', JSON.stringify(action.user));
      return { ...state, isAuthenticated: true, token: action.token, user: action.user, loading: false };
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { ...state, isAuthenticated: false, token: null, user: null, loading: false };
    case 'UPDATE_USER':
      localStorage.setItem('user', JSON.stringify(action.user));
      return { ...state, user: action.user, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const handleLogout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, [dispatch]);

  const handleLogin = useCallback((token: string, user: User) => {
    dispatch({ type: 'LOGIN', token, user });
  }, [dispatch]);

  useEffect(() => {
    if (state.token) {
      fetchCurrentUser(state.token).then(user => {
        if (user) {
          dispatch({ type: 'UPDATE_USER', user });
        } else {
          handleLogout();
        }
      }).catch(() => {
        handleLogout();
      }).finally(() => {
        dispatch({ type: 'SET_LOADING', loading: false });
      });
    } else {
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  }, [state.token, dispatch, handleLogout]);


  return (
    <AuthContext.Provider value={{ state, dispatch, handleLogout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
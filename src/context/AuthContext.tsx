import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import { fetchCurrentUser } from '../api/AuthApi';

type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
};

type AuthState = {
    isAuthenticated: boolean;
    token: string | null;
    user: User | null;
};

type AuthAction = 
    | { type: 'LOGIN'; token: string; user: User }
    | { type: 'LOGOUT' }
    | { type: 'UPDATE_USER'; user: User };

const initialState: AuthState = {
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
};

const AuthContext = createContext<{ state: AuthState; dispatch: React.Dispatch<AuthAction> }>({
    state: initialState,
    dispatch: () => null,
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('token', action.token);
            localStorage.setItem('user', JSON.stringify(action.user));
            return { isAuthenticated: true, token: action.token, user: action.user };
        case 'LOGOUT':
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return { isAuthenticated: false, token: null, user: null };
        case 'UPDATE_USER':
            localStorage.setItem('user', JSON.stringify(action.user));
            return { ...state, user: action.user };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        if (state.token) {
          fetchCurrentUser(state.token).then(user => {
                if (user) {
                    dispatch({ type: 'UPDATE_USER', user });
                } else {
                    dispatch({ type: 'LOGOUT' });
                }
            });
        }
    }, [state.token]);


    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
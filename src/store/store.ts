import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { employeeReducer, taskReducer, authReducer } from './reducers';

const rootReducer = combineReducers({
    employees: employeeReducer,
    tasks: taskReducer,
    auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer
});
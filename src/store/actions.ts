import axios from 'axios';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';
import { SET_EMPLOYEES, SET_TASKS, LOGIN, LOGOUT, EmployeeActionTypes, TaskActionTypes, AuthActionTypes, RootAction } from './actionTypes';


export const setEmployees = (employees: any[]): EmployeeActionTypes => ({
    type: SET_EMPLOYEES,
    payload: employees
});

export const setTasks = (tasks: any[]): TaskActionTypes => ({
    type: SET_TASKS,
    payload: tasks
});

export const login = (employee: any): AuthActionTypes => ({
    type: LOGIN,
    payload: employee
});

export const logout = (): AuthActionTypes => ({
    type: LOGOUT
});


export const fetchEmployees = (): ThunkAction<void, RootState, unknown, RootAction> => async (dispatch: Dispatch<RootAction>) => {
  const response = await axios.get('/api/employees');
  dispatch(setEmployees(response.data));
};

export const fetchTasks = (): ThunkAction<void, RootState, unknown, RootAction> => async (dispatch: Dispatch<RootAction>) => {
  const response = await axios.get('/api/tasks');
  dispatch(setTasks(response.data));
};
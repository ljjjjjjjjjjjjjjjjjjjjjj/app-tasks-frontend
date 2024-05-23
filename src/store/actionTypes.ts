export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const SET_TASKS = 'SET_TASKS';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

interface SetEmployeesAction {
    type: typeof SET_EMPLOYEES;
    payload: any[];
}

interface SetTasksAction {
    type: typeof SET_TASKS;
    payload: any[];
}

interface LoginAction {
    type: typeof LOGIN;
    payload: any;
}

interface LogoutAction {
    type: typeof LOGOUT;
}

export type EmployeeActionTypes = SetEmployeesAction;
export type TaskActionTypes = SetTasksAction;
export type AuthActionTypes = LoginAction | LogoutAction;

export type RootAction = EmployeeActionTypes | TaskActionTypes | AuthActionTypes;
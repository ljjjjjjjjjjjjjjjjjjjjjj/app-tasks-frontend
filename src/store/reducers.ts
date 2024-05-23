import { SET_EMPLOYEES, SET_TASKS, LOGIN, LOGOUT, EmployeeActionTypes, TaskActionTypes, AuthActionTypes } from './actionTypes';

const initialState = {
    employees: [],
    tasks: [],
    auth: {
        isAuthenticated: false,
        employee: null
    }
};

const employeeReducer = (state = initialState.employees, action: EmployeeActionTypes) => {
    switch (action.type) {
        case SET_EMPLOYEES:
            return action.payload;
        default:
            return state;
    }
};

const taskReducer = (state = initialState.tasks, action: TaskActionTypes) => {
    switch (action.type) {
        case SET_TASKS:
            return action.payload;
        default:
            return state;
    }
};

const authReducer = (state = initialState.auth, action: AuthActionTypes) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, isAuthenticated: true, employee: action.payload };
        case LOGOUT:
            return { ...state, isAuthenticated: false, employee: null };
        default:
            return state;
    }
};

export { employeeReducer, taskReducer, authReducer };
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../store/actions';
import { RootState } from '../store/store';
import { RootAction } from '../store/actionTypes';
import { ThunkDispatch } from 'redux-thunk';

interface Task {
  taskId: string;
  title: string;
  employeeId: string;
}

const Tasks: React.FC = () => {
    const tasks = useSelector((state: RootState) => state.tasks);
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, RootAction>>();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <div>
            <h1>Tasks</h1>
            <table>
                <thead>
                    <tr>
                        <th>Task ID</th>
                        <th>Title</th>
                        <th>Employee ID</th>
                    </tr>
                </thead>
                
                <tbody>
                  {tasks.map((task: Task) => (
                          <tr key={task.taskId}>
                              <td>{task.taskId}</td>
                              <td>{task.title}</td>
                              <td>{task.employeeId}</td>
                          </tr>
                      ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tasks;
import React, { useEffect, useState } from 'react';
import { TaskModel } from '../../models/TaskModel';
import { fetchAllTasks } from '../../api/TasksApi';
import { useNavigate } from 'react-router-dom';
import './Tasks.scss'

export function Tasks () {
  const [taskList, setTaskList] = useState<TaskModel[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const getTaskList = async () => {
      try {
        setErrorMessage("");
        const fetchedTasks = await fetchAllTasks();

        if (fetchedTasks.length === 0) {
          setErrorMessage("No tasks were found.");
        } else {
          setTaskList(fetchedTasks);
        }
      } catch (error) {
        console.error('Failed to fetch tasks', error);
        setErrorMessage("Failed to fetch tasks. Please try again later.");
      }
    };

    getTaskList();
  }, []);

    
    return (
      <div className='tasks-container'>

        <div className='tasks-header'>

          <div className='tasks-header-title'>
            <h1>Project title</h1>
          </div>

          <div className='tasks-header-subtitle'>
            <h3>Other info</h3>
          </div>

          <div className='tasks-header-text'>
            <p>Simple text</p>
          </div>

        </div>

        <div className='tasks-status-container'>

          <div className='tasks-status-item'>
            <h3>Not started (number)</h3>

            <div>
              <p>1. There will be a list of tasks</p>
              <p>2. There will be tasks</p>
            </div>
          </div>

          <div className='tasks-status-item'>
            <h3>In progress (number)</h3>

            <div>
              <p>1. There will be a list of tasks</p>
              <p>2. There will be tasks</p>
              <p>1. There will be a list of tasks</p>
              <p>2. There will be tasks</p>
              <p>1. There will be a list of tasks</p>
              <p>2. There will be tasks</p>
            </div>
          </div>

          <div className='tasks-status-item'>
            <h3>In review (number)</h3>

            <div>
              <p>1. There will be a list of tasks</p>
              <p>2. There will be tasks</p>
            </div>
          </div>

          <div className='tasks-status-item'>
            <h3>Done (number)</h3>

            <div>
              <p>1. There will be a list of tasks</p>
              <p>2. There will be tasks</p>
            </div>
          </div>

        </div>




        <h1>Tasks</h1>
        {taskList.length > 0 && (
          <ul>
            {taskList.map(task => (
              <li key={task.taskId}>
                {task.taskId}. {task.title} - Created by: {task.createdById} <br/>
                {task.status} {task.priority && `(${task.priority})`} 
                <button onClick={() => navigate(`/tasks/${task.taskId}`)} className='btn btn-primary'>View / Edit</button>
                <p> </p>
              </li>
            ))}
          </ul>
        )}
        {errorMessage && <p>{errorMessage}</p>} 
    </div>
    );
  };

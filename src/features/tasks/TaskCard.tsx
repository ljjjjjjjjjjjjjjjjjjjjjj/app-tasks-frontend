import React, { useEffect, useState } from 'react';
import { TaskModel } from '../../models/TaskModel';
import { fetchTaskById } from '../../api/TasksApi';
import { useParams } from 'react-router-dom';

export function TaskCard () {
  const { taskId } = useParams();
  const [task, setTask] = useState<TaskModel>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const getTask = async () => {

      if (!taskId) {
        setErrorMessage("No task ID provided.");
        return;
      }

      try {
        setErrorMessage("");
        const fetchedTask = await fetchTaskById(taskId);
        setTask(fetchedTask);
      } catch (error) {
        console.error('Failed to fetch task', error);
        setErrorMessage("Failed to fetch task. Please try again later.");
      }
    };

    getTask();
  }, [taskId]);

    
    return (
      <div>
        <h1>Task Details</h1>
        {task ? (
          <p>
            {task.title} - {task.status} {task.priority && `(${task.priority})`}
          </p>
        ) : (
          <p>{errorMessage || "Loading..."}</p>
        )}
      </div>
    );
  };

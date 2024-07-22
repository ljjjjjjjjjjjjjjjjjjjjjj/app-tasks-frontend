import React, { useEffect, useState } from 'react';
import { fetchTasksDetailedByEmployeeId, fetchTasksDetailedByProjectId } from '../../api/TasksApi';
import { ProjectModel } from '../../models/ProjectModel';
import { fetchUserProjects } from '../../api/ProjectsApi';
import { useAuth } from '../../context/AuthContext';
import { TaskDescription } from './TaskDescription';
import { TaskPageModal } from './TaskPageModal';
import { TaskDetailedModel } from '../../models/TaskDetailedModel';

import './Tasks.scss'

export function Tasks () {
  const { state } = useAuth();

  const [taskList, setTaskList] = useState<TaskDetailedModel[]>([]);
  const [projectList, setProjectList] = useState<ProjectModel[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskDetailedModel | null>(null);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const getTaskList = async () => {
      try {
        if (state.user?.employeeId) {
        setErrorMessage("");
        const fetchedTasks = selectedProjectId
            ? await fetchTasksDetailedByProjectId(selectedProjectId)
            : await fetchTasksDetailedByEmployeeId(state.user.employeeId);
        
        if (fetchedTasks.length === 0) {
          setErrorMessage("No tasks were found.");
        } else {
          setTaskList(fetchedTasks);
        }
      }
      } catch (error) {
        console.error('Failed to fetch tasks', error);
        setErrorMessage("Failed to fetch tasks. Please try again later.");
      }
    };

    const getUserProjects = async () => {
      try {
        if (state.user?.employeeId) {
          const fetchedProjects = await fetchUserProjects(state.user.employeeId);
          setProjectList(fetchedProjects);
        }
      } catch (error) {
        console.error('Failed to fetch projects', error);
      }
    };

    getTaskList();
    getUserProjects();
  }, [state.user, selectedProjectId]);

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = event.target.value;
    setSelectedProjectId(projectId || null);
  };

  const filteredTasks = selectedProjectId
  ? taskList.filter(task => task.projectId === selectedProjectId)
  : taskList.filter(task => !task.projectId);

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const openTaskModal = (task: TaskDetailedModel) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeTaskCard = () => { 
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const handleTaskUpdated = (updatedTask: TaskDetailedModel) => {
    setTaskList(prevTasks =>
      prevTasks.map(task => (task.taskId === updatedTask.taskId ? updatedTask : task))
    );
  };

    
  return (
    <div className='tasks-container'>

      <div className='tasks-header'>

        <div className='tasks-header-title'>

          {/* Dropdown list */}
          <select onChange={handleProjectChange} value={selectedProjectId || ""}>
            <option value="">Individual tasks</option>
            {projectList.map(project => (
              <option key={project.projectId} value={project.projectId}>
                {project.projectName}
              </option>
            ))}
          </select>
      </div>

        <div className='tasks-header-subtitle'>
          <h3>Other select</h3>
        </div>

        <div className='tasks-header-subtitle'>
          <h3>Another select</h3>
        </div>

      </div>


      <div className='tasks-status-container'>
        {['NOT_STARTED', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'].map(status => (
          <div className='tasks-status-item' key={status}>
            <h3>{status.replace('_', ' ')} ({getTasksByStatus(status).length})</h3>
            <div>
            {getTasksByStatus(status).map(task => (
                <TaskDescription key={task.taskId} task={task} onClick={() => openTaskModal(task)} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className='modal-overlay' onClick={closeTaskCard}>
          <div className='modal-content' onClick={e => e.stopPropagation()}>
            <button className='close-button' onClick={closeTaskCard}></button>
            {selectedTask && (
              <TaskPageModal task={selectedTask} onClose={closeTaskCard} onTaskUpdated={handleTaskUpdated} />
            )}
          </div>
        </div>
      )}
  
      {errorMessage && <p>{errorMessage}</p>} 

    </div>
    );
  };

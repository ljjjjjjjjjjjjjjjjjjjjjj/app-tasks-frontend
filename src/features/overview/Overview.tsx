import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useAuth } from '../../context/AuthContext';
import { ProjectModel } from '../../models/ProjectModel';
import { TaskDetailedModel } from '../../models/TaskDetailedModel';
import { fetchTasksDetailedByAssignedToId, fetchTasksDetailedByCreatedById } from '../../api/TasksApi';
import { fetchUserProjects } from '../../api/ProjectsApi';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Overview.scss'

ChartJS.register(ArcElement, Tooltip, Legend);


export function Overview() {
  const { state } = useAuth();

  const [taskList, setTaskList] = useState<TaskDetailedModel[]>([]);
  const [taskCountAssignedTo, setTaskCountAssignedTo] = useState<number | null>(null);
  const [taskCountCreatedBy, setTaskCountCreatedBy] = useState<number | null>(null);
  const [taskCountTotal, setTaskCountTotal] = useState<number | null>(null);

  const [projectList, setProjectList] = useState<ProjectModel[]>([]);
  const [projectCountAssignedTo, setProjectCountAssignedTo] = useState<number | null>(null);
  const [projectCountCreatedBy, setProjectCountCreatedBy] = useState<number | null>(null);
 
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const getTaskList = async () => {
      try {
        if (state.user?.employeeId) {
        setErrorMessage("");
        const fetchedTasksAssignedTo = await fetchTasksDetailedByAssignedToId(state.user.employeeId);
        const fetchedTasksCreatedBy = await fetchTasksDetailedByCreatedById(state.user.employeeId);

        setTaskCountAssignedTo(fetchTasksDetailedByAssignedToId.length);
        setTaskCountCreatedBy(fetchTasksDetailedByCreatedById.length);

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
  }, [state.user]);

  useEffect(() => {
    if (taskCountAssignedTo !== null && taskCountCreatedBy !== null) {
      setTaskCountTotal(taskCountAssignedTo + taskCountCreatedBy);
    }
  }, [taskCountAssignedTo, taskCountCreatedBy]);

  const data = {
    labels: ['Assigned To', 'Created By'],
    datasets: [
      {
        data: [taskCountAssignedTo, taskCountCreatedBy],
        backgroundColor: ['#4caf50', '#03a9f4'], // green and light blue
        hoverBackgroundColor: ['#66bb6a', '#29b6f6'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%', // This makes the donut chart hollow
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
      },
    },
  };

  
  return (
    <div className='overview-container'>
      <h1>Overview</h1>

      <div className='overview-chart-container'>

        <div className='overview-chart-item'>
          <h3>Tasks</h3>
          <div className="chart">
            <Doughnut data={data} options={options} />
          </div>
          <p>Assigned: {taskCountAssignedTo}</p>
          <p>Created: {taskCountCreatedBy}</p>
          <p>Total: {taskCountTotal}</p>
        
        </div>
  
  
        <div className='overview-chart-item'>
          <h3>Projects</h3>
          <div className="chart">
            <Doughnut data={data} options={options} />
          </div>
          <p>Assigned: {taskCountAssignedTo}</p>
          <p>Created: {taskCountCreatedBy}</p>
          <p>Total: {taskCountTotal}</p>
        
        </div>
  
  
        <div className='overview-chart-item'>
          <h3>Something else</h3>
          <div className="chart">
            <Doughnut data={data} options={options} />
          </div>
          <p>Assigned: {taskCountAssignedTo}</p>
          <p>Created: {taskCountCreatedBy}</p>
          <p>Total: {taskCountTotal}</p>
        
        </div>

      </div>


      <h3>Projectss</h3>
      <p>Tasks</p>
      <p>Tasks</p>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}


    </div>
  );
}

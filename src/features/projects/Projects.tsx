import React, { useEffect, useState } from 'react';
import { fetchUserProjectsByStatus } from '../../api/ProjectsApi';
import { useAuth } from '../../context/AuthContext';

import { ProjectDetailedModel } from '../../models/ProjectDetailedModel';

import { ProjectDescription } from './ProjectDescription';
import { ProjectPageModal } from './ProjectPageModal';

import './Projects.scss'


export function Projects () {
  const { state } = useAuth();

  const [projectList, setProjectList] = useState<ProjectDetailedModel[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectDetailedModel | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const [selectedStatus, setSelectedStatus] = useState<string>('ACTIVE');

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    
    const getUserProjects = async () => {
      try {
        if (state.user?.employeeId) {
          let fetchedProjects: ProjectDetailedModel[] = [];
          if (selectedStatus === 'ACTIVE') {
            const inProgressProjects = await fetchUserProjectsByStatus(state.user.employeeId, 'IN_PROGRESS');
            const inReviewProjects = await fetchUserProjectsByStatus(state.user.employeeId, 'IN_REVIEW');
            fetchedProjects = [...inProgressProjects, ...inReviewProjects];
          } else {
            fetchedProjects = await fetchUserProjectsByStatus(state.user.employeeId, selectedStatus);
          }
          setProjectList(fetchedProjects);
        }
      } catch (error) {
        console.error('Failed to fetch projects', error);
        setErrorMessage('Failed to fetch projects');
      }
    };

    getUserProjects();
  }, [state.user, selectedStatus]);

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = event.target.value;
    setSelectedProjectId(projectId || null);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ');
  };

  const openProjectModal = (project: ProjectDetailedModel) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectCard = () => { 
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  const handleProjectUpdated = (updatedProject: ProjectDetailedModel) => {
    setProjectList(prevProjects =>
      prevProjects.map(project => (project.projectId === updatedProject.projectId ? updatedProject : project))
    );
  };

    
  return (
    <div className='projects-container'>

      <div className='projects-header'>

        {/* Dropdown list - STATUS*/}
        <div className='projects-header-subtitle'>
          <select onChange={handleStatusChange} value={selectedStatus}>
            <option value='ACTIVE'>Active</option>
            <option value='IN_PROGRESS'>In Progress</option>
            <option value='IN_REVIEW'>In Review</option>
            <option value='NOT_STARTED'>Not Started</option>
            <option value='DONE'>Done</option>
          </select>
        </div> 

        <div className='projects-header-subtitle'>
          <h3>Other select</h3>
        </div>

        <div className='projects-header-subtitle'>
          <h3>Another select</h3>
        </div>

      </div>


      <div className='projects-status-container'>
        <h3>{formatStatus(selectedStatus)}</h3>

        <div className='projects-status-items'>
          {projectList.length === 0 ? (
            <p>No projects</p>
          ) : (
            projectList.map(project => (
              <ProjectDescription key={project.projectId} project={project} onClick={() => openProjectModal(project)} />
            ))
          )}
        </div>

      </div>

      {isModalOpen && (
        <div className='modal-overlay' onClick={closeProjectCard}>
          <div className='modal-content' onClick={e => e.stopPropagation()}>
            <button className='close-button' onClick={closeProjectCard}></button>
            {selectedProject && (
              <ProjectPageModal project={selectedProject} onClose={closeProjectCard} onProjectUpdated={handleProjectUpdated} />
            )}
          </div>
        </div>
      )}
  
      {errorMessage && <p>{errorMessage}</p>} 

    </div>
    );
  };

import { useEffect, useState } from 'react';
import { CategoryModel } from '../../models/CategoryModel';
import { EmployeeModel } from '../../models/EmployeeModel';
import { ProjectDetailedModel } from '../../models/ProjectDetailedModel';
import { ProjectModel } from '../../models/ProjectModel';
import { addParticipant, addTeam, fetchUserProjects } from '../../api/ProjectsApi';
import { useAuth } from '../../context/AuthContext';
import { updateProject } from '../../api/ProjectsApi';
import { createCategory, fetchCategories } from '../../api/CategoriesApi';
import { fetchEmployees } from '../../api/EmployeesApi';
import { CustomSelect } from '../../components/common/CustomSelect';

import './ProjectPageModal.scss'

interface ProjectPageModalProps {
  project: ProjectDetailedModel;
  onClose: () => void;
  onProjectUpdated: (updatedProject: ProjectDetailedModel) => void;
}

export function ProjectPageModal ({ project, onClose, onProjectUpdated }: ProjectPageModalProps) {
  const { state } = useAuth();
  
  const [formProject, setFormProject] = useState<ProjectDetailedModel>({ ...project });
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [newParticipantId, setNewParticipantId] = useState<string>('');
  const [newTeamId, setNewTeamId] = useState<string>('');

  // fetching all relevant fields
  useEffect(() => {
    
    const getEmployees = async () => {
      const employeesData = await fetchEmployees();
      setEmployees(employeesData);
    };

    getEmployees();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormProject(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddParticipant = async () => {
    if (newParticipantId) {
      await addParticipant(formProject.projectId!, newParticipantId);
      const updatedParticipants = [...formProject.participants, newParticipantId];
      setFormProject(prevState => ({
        ...prevState,
        participantIds: updatedParticipants,
      }));
      setNewParticipantId('');
    }
  };

  const handleAddTeam = async () => {
    if (newTeamId) {
      await addTeam(formProject.projectId!, newTeamId);
      const updatedTeams = [...formProject.teams, newTeamId];
      setFormProject(prevState => ({
        ...prevState,
        teamIds: updatedTeams,
      }));
      setNewTeamId('');
    }
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProject(formProject, formProject.projectId!);
      onProjectUpdated(formProject);
      onClose();
    } catch (error) {
      console.error('Failed to update project', error);
    }
  };


  return (
    <div className="project-modal">
      <h3 className='project-title'>{project.projectName}</h3>
      
      <form onSubmit={handleSubmit}>

        <div className='project-form-item'>
          <label htmlFor="title">
            Title:
          </label>
          <input 
            type="text" 
            id="projectName" 
            name="projectName" 
            value={formProject.projectName} 
            onChange={handleChange} 
            required />
        </div>

        <div className='project-form-item'>
          <p>
            Project participants: 
          </p>
          <ul>
            {formProject.participants.map(participant => (
              <li key={participant.employeeId}>{participant.firstName} {participant.lastName}</li>
            ))}
          </ul>
        </div>

        <div className='project-form-item'>
          <label htmlFor="newParticipantId">
            Add participant:
          </label>
          <select 
            id="newParticipantId" 
            name="newParticipantId" 
            value={newParticipantId} 
            onChange={(e) => setNewParticipantId(e.target.value)}
          >
            <option value="">None</option>
            {employees.map(employee => (
              <option key={employee.employeeId} value={employee.employeeId}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleAddParticipant}>Add</button>
        </div>

        <div className='project-form-item'>
          <p>
            Project teams: // list of current teams to be added.
          </p>
          <ul>
            {formProject.teams.map(team => (
              <li key={team.teamId}>{team.teamName}</li>
            ))}
          </ul>
        </div>

        <div className='project-form-item'>
          <label htmlFor="newTeamId">
            Add team:
          </label>
          <select 
            id="newTeamId" 
            name="newTeamId" 
            value={newTeamId} 
            onChange={(e) => setNewTeamId(e.target.value)}
          >
            <option value="">None</option>
            {employees.map(employee => (
              <option key={employee.employeeId} value={employee.employeeId}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleAddTeam}>Add Team</button>
        </div>


        <div className='project-form-item'>
          <label htmlFor="status">
            Status:
          </label>
          <select id="status" name="status" value={formProject.status} onChange={handleChange}>
            <option value="NOT_STARTED">Not Started</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="IN_REVIEW">In Review</option>
            <option value="DONE">Done</option>
          </select>
        </div>


        <div className='project-form-submit-buttons'>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>

      </form>
    </div>
  );
};
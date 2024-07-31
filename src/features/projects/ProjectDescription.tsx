import { ProjectDetailedModel } from '../../models/ProjectDetailedModel';
import './ProjectDescription.scss'

interface ProjectDescriptionProps {
  project: ProjectDetailedModel;
  onClick: () => void; 
}

export function ProjectDescription ({ project, onClick }: ProjectDescriptionProps) {

  const formatDate = (date: Date | null | undefined): string => {
    return date ? new Date(date).toLocaleDateString() : 'N/A';
  };

  return (
    <div className='project-item' onClick={onClick}>

      <p className='project-title'>
        {project.projectName} 
      </p>
      <p className='project-small-font'>
        Created: {formatDate(project.createdDate)} 
      </p>
      <p className='project-small-font'>
        Deadline: {formatDate(project.initialDeadlineDate)} 
      </p>
      <p className='project-small-font'>
        Teams included: {project.teams.join(', ')} 
      </p>

      <div className='project-small-font'>
        <p>Teams included: </p>
        {project.teams.length === 0 ? (
          <p>none</p>
        ) : (
          project.teams.map((team, index) => (
            <div key={index}>
              {team.teamName}
            </div>
          ))
        )}
      </div>

      <div className='project-small-font'>
        <p>Employees: </p>
        {project.participants.length === 0 ? (
          <p>none</p>
        ) : (
          project.participants.map((participant, index) => (
          <div key={index}>
            {participant.firstName} {participant.lastName}
          </div>
          ))
        )}
      </div>

     
    </div>
  );
};
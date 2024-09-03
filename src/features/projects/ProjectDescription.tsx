import { EmployeeImageDisplay } from '../../components/common/EmployeeImageDisplay';
import { ProgressCircle } from '../../components/common/ProgressCircle';
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

  const formatStatus = (status: string) => {
    return status
    // g - Global Search
    // w - Word Character
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/^\w/, c => c.toUpperCase());
  };

  return (
    <div className='project-item' onClick={onClick}>

      <div className='project-title-box'>
      
        <div className='project-title-text'>
          <p className='project-medium-text'>
            {project.projectName} ({formatStatus(project.status)})
          </p>
        </div>
        
        <div className='project-title-priority'>
        <ProgressCircle progress={project.progress} />
        </div>
      
      </div>


      <div className='project-timeline'>
        <h3>Timeline:</h3>
        <p>
          Created: {formatDate(project.createdDate)} 
        </p>
        <p>
          Start: {formatDate(project.startDate)} 
        </p>
        <p>
          Deadline: {formatDate(project.initialDeadlineDate)} 
        </p>
        <p>
          {project.status === "Done" ? (
            <>
            Actual End: {formatDate(project.endDate)}
            </>
            ) : (
            <></>
          )
          }
        </p>
      </div>


      <div className='project-employees'>
        <div>
          <h3>Employees: </h3>
          {project.participants.length === 0 ? (
            <p>none</p>
          ) : (
            project.participants.map((participant, index) => (
            <div key={index} className="employee-item">
              <EmployeeImageDisplay employee={participant}/>
              <p className="employee-name">{participant.firstName} {participant.lastName}</p>
            </div>
            ))
          )}
        </div> 
      </div>

      <div className='project-teams'>
        <div>
          <h3>Teams: </h3>
          {project.teams.length === 0 ? (
            <p>none</p>
          ) : (
            project.teams.map((team, index) => (
              <div key={index}>
                <p>{team.teamName}</p>
              </div>
            ))
          )}
        </div>        
      </div>
     
    </div>
  );
};
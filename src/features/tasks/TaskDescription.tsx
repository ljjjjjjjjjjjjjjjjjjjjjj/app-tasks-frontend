import { TaskModel } from '../../models/TaskModel';
import './TaskDescription.scss'

interface TaskDescriptionProps {
  task: TaskModel;
  onClick: () => void; 
}

export function TaskDescription ({ task, onClick }: TaskDescriptionProps) {
  const getShortDescription = (description: string | undefined) => {
    if (!description) return "";
    return description.length > 40 ? description.slice(0, 40) + '...' : description;
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'HIGHEST':
        return 'priority-highest';
      case 'HIGH':
        return 'priority-high';
      case 'MEDIUM':
        return 'priority-medium';
      case 'LOW':
        return 'priority-low';
      case 'LOWEST':
        return 'priority-lowest';
      default:
        return '';
    }
  };


  return (
    <div className='task-item' onClick={onClick}>

      <p className='task-title'>
        {task.title} 
        <span className={`priority-circle ${getPriorityClass(task.priority)}`}></span>
      </p>
      <p className='task-small-font'>
        {getShortDescription(task.description)}
      </p>
    </div>
  );
};
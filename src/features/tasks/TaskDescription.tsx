import { PriorityCircle } from '../../components/common/PriorityCircle';
import { TaskDetailedModel } from '../../models/TaskDetailedModel';
import './TaskDescription.scss'

interface TaskDescriptionProps {
  task: TaskDetailedModel;
  onClick: () => void; 
}

export function TaskDescription ({ task, onClick }: TaskDescriptionProps) {
  const isAssigned = task.assignedToFirstName || task.assignedToLastName;

  const getShortDescription = (description: string | undefined) => {
    if (!description) return "";
    return description.length > 40 ? description.slice(0, 40) + '...' : description;
  };

  return (
    <div className='task-item' onClick={onClick}>

      <p className='task-title'>
        {task.title} 
        <PriorityCircle priority={task.priority} />
      </p>
      <p className='task-small-font'>
        {getShortDescription(task.description)}
      </p>
      <p className='task-small-font'>
         Assigned to: {isAssigned ? `${task.assignedToFirstName ?? ''} ${task.assignedToLastName ?? ''}`.trim() : 'none'}
      </p>
    </div>
  );
};
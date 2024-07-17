import { TaskModel } from '../../models/TaskModel';
import './TaskPageModal.scss'

interface TaskPageModalProps {
  task: TaskModel;
}

export function TaskPageModal ({ task }: TaskPageModalProps) {

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

  const formatDate = (date: Date | null | undefined): string => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };


  return (
    <div className='task-card'>
      <h3 className='task-title'>
        {task.title}
        <span className={`priority-circle ${getPriorityClass(task.priority)}`}></span>
      </h3>
      <p className='task-mid-font'>
        {task.description}
      </p>
      <p className='task-mid-font'>
        {task.category?.name}
      </p>
      <p className='task-mid-font'>
        {task.status}
      </p>

      <div className='created'>
        <p className='task-mid-font'>
          Created by: {task.createdById}
        </p>
        <p className='task-mid-font'>
          Created on: {formatDate(task.createdDate)}
        </p>
      </div>

      <div className='if-assigned'>
        <p className='task-mid-font'>
          Assigned to: {task.assignedToId}
        </p>
        <p className='task-mid-font'>
          Assigned on: {formatDate(task.assignedDate)}
        </p>
      </div>

      {task.doneDate && (
        <div className='if-done'>
          <p className='task-mid-font'>
            Done on: {formatDate(task.doneDate)}
          </p>
        </div>
      )}
      
    </div>
  );
};
  
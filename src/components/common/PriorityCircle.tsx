import './PriorityCircle.scss';

interface PriorityCircleProps {
  priority: string;
}

const getPriorityClass = (priority: string): string => {
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

export const PriorityCircle: React.FC<PriorityCircleProps> = ({ priority }) => {
  return <span className={`priority-circle ${getPriorityClass(priority)}`}></span>;
};
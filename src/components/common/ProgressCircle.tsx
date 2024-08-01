import { useState } from 'react';
import './ProgressCircle.scss';

interface ProgressCircleProps {
  progress: number;
}

export function ProgressCircle({ progress }: ProgressCircleProps) {
  const radius = 50;
  const strokeWidth = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const size = 2 * (radius + strokeWidth / 2);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="progress-circle-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg className="progress-circle" viewBox={`0 0 ${size} ${size}`} preserveAspectRatio="xMinYMin meet">
        <circle
          className="progress-circle__background"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="progress-circle__progress"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {isHovered && <div className="progress-tooltip">Progress: {progress}%</div>}
    </div>
  );
}
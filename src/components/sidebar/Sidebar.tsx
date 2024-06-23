import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRoutes } from '../../routes/AppRoutes';
import { RootState } from '../../store/store';
import './Sidebar.scss';
import { useAuth } from '../../context/AuthContext';


export function Sidebar() {
  const navigate = useNavigate();
  const currentPage = useSelector((state: RootState) => state.currentPage.currentPage);
  const { state: authState } = useAuth();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => currentPage === path;
  
  return (
    <div className="sidebar">
      
      <button
        onClick={() => handleNavigate(AppRoutes.HOME)}
        className={`btn ${isActive(AppRoutes.HOME) ? 'active' : ''}`}
      >
        Home
      </button>

      {authState.isAuthenticated && (
        <>
          <button
            onClick={() => handleNavigate(AppRoutes.OVERVIEW)}
            className={`btn ${isActive(AppRoutes.OVERVIEW) ? 'active' : ''}`}
          >
            Overview
          </button>
    
          <button
            onClick={() => handleNavigate(AppRoutes.TASKS)}
            className={`btn ${isActive(AppRoutes.TASKS) ? 'active' : ''}`}
          >
            Tasks
          </button>
    
          <button
            onClick={() => handleNavigate(AppRoutes.CALENDAR)}
            className={`btn ${isActive(AppRoutes.CALENDAR) ? 'active' : ''}`}
          >
            Calendar
          </button>
    
          <button
            onClick={() => handleNavigate(AppRoutes.SETTINGS)}
            className={`btn ${isActive(AppRoutes.SETTINGS) ? 'active' : ''}`}
          >
            Settings
          </button>
        </>
      )}
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routes/AppRoutes";
import './ErrorPage.scss'

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-title">
        <h1>404</h1>
        <h3>Page not found</h3>
      </div>

      <div className="error-content">
        <p>Sorry, we couldn’t find the page you’re looking for.</p>
        <button onClick={() => navigate(AppRoutes.HOME)} className="btn btn-primary">
          Back to the Home page
        </button>
      </div>
    </div>
  );
  
}

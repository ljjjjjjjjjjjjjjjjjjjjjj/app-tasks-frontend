const BASE_URL = 'http://localhost:8080/auth';

export const fetchCurrentUser = async (token: string) => {
  const response = await fetch(`${BASE_URL}/current-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  });
  return handleResponse(response);
};

export const login = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

export const signup = async (firstName: string, lastName: string, email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstName, lastName, email, password }),
  });
  return handleResponse(response);
};

const handleResponse = async (response: Response) => {
  if (response.ok) {
    return response.json();
  } 
  else {
    if (response.status === 403) {
      logout();
      throw new Error("Token is invalid or expired. Redirecting to home page.");
    }
    const errorData = await response.json();
    throw errorData || { general: 'Authentication failed' };
  }
};

const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};
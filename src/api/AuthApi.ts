export const fetchCurrentUser = async (token: string) => {
  try {
      const response = await fetch('http://localhost:8080/auth/current-user', {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      if (response.ok) {
          return response.json();
      } else {
          return null;
      }
  } catch (error) {
      return null;
  }
};

export const login = async (email: string, password: string) => {
  try {
      const response = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
          return response.json();
      } else {
          throw new Error('Login failed');
      }
  } catch (error) {
      throw error;
  }
};

export const signup = async (firstName: string, lastName: string, email: string, password: string) => {
  try {
      const response = await fetch('http://localhost:8080/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstName, lastName, email, password }),
      });
      if (response.ok) {
          return response.json();
      } else {
          throw new Error('Signup failed');
      }
  } catch (error) {
      throw error;
  }
};
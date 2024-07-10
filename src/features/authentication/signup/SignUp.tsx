import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.scss';
import { AppRoutes } from '../../../routes/AppRoutes';
import { signup } from '../../../api/AuthApi';
import { RegistrationModel } from '../../../models/RegistrationModel';


export function SignUp () {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState<RegistrationModel>({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successfulRegistration, setSuccessfulRegistration] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors = validateForm(registrationData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await signup({
        firstName: registrationData.firstName,
        lastName: registrationData.lastName,
        email: registrationData.email,
        password: registrationData.password
      });
      setSuccessfulRegistration(true);
      setTimeout(() => {
        navigate(AppRoutes.LOGIN);
      }, 2000);
    } 
    catch (error: any) {
      const newErrors: { [key: string]: string } = {};
      if (error.email) newErrors.email = error.email;
      if (error.firstName) newErrors.firstName = error.firstName;
      if (error.lastName) newErrors.lastName = error.lastName;
      if (error.password) newErrors.password = error.password;
      if (error.general) newErrors.general = error.detail;
      setErrors(newErrors);
    }
  };

  const validateForm = (data: RegistrationModel) => {
    const newErrors: { [key: string]: string } = {};
    if (!isEmailValid(data.email)) {
      newErrors.email = 'Invalid email format';
    }
    const passwordErrors = validatePasswords(data.password, confirmPassword);
    return { ...newErrors, ...passwordErrors };
  };
  
  const validatePasswords = (password: string, confirmPassword: string) => {
    const passwordErrors: { [key: string]: string } = {};
    if (!isPasswordStrong(password)) {
      passwordErrors.password = 'Password is too weak';
    }
    if (password !== confirmPassword) {
      passwordErrors.confirmPassword = 'Passwords do not match';
    }

    return passwordErrors;
  };

  const isPasswordStrong = (password: string): boolean => {
    const regex = new RegExp('^(?=.*[A-Za-z])(?=.*[0-9@#$%^&+=!]).{8,64}$');
    return regex.test(password);
  }

  const isEmailValid = (email: string): boolean => {
    const regex = new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$');
    return regex.test(email);
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRegistrationData(prevData => ({ ...prevData, [id]: value }));

    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      delete newErrors[id];
      return newErrors;
    });
  };


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === 'password') {
      setRegistrationData(prevData => ({ ...prevData, password: value }));
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        const passwordValidationErrors = validatePasswords(value, confirmPassword);
        newErrors.password = passwordValidationErrors.password || '';
        newErrors.confirmPassword = passwordValidationErrors.confirmPassword || '';
        return newErrors;
      });
    } else if (id === 'confirmPassword') {
      setConfirmPassword(value);
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        const passwordValidationErrors = validatePasswords(registrationData.password, value);
        newErrors.confirmPassword = passwordValidationErrors.confirmPassword || '';
        newErrors.password = passwordValidationErrors.password || '';
        return newErrors;
      });
    }
  };


  return (
      <div className="auth-container">
          <form onSubmit={handleSignup} className="auth-form">
            <h1 className="auth-title">Sign Up</h1>

            <label className="auth-label" htmlFor="firstName">
              First name
            </label>
            <div className="auth-input-container">
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={registrationData.firstName}
                onChange={handleChange}
                required
                className="auth-input"
              />
              {errors.firstName && <div className="auth-error">{errors.firstName}</div>}
             </div>

            <label className="auth-label" htmlFor="lastName">
              Last name
            </label>
            <div className="auth-input-container">
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={registrationData.lastName}
                onChange={handleChange}
                required
                className="auth-input"
              />
              {errors.lastName && <div className="auth-error">{errors.lastName}</div>}
            </div>

            <label className="auth-label" htmlFor="email">
              Email
            </label>
            <div className="auth-input-container">  
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={registrationData.email}
                onChange={handleChange}
                required
                className="auth-input"
              />
              {errors.email && <div className="auth-error">{errors.email}</div>}
            </div>

            <label className="auth-label" htmlFor="password">
              Password
            </label>
            <div className="auth-input-container">
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={registrationData.password}
                onChange={handlePasswordChange}
                required
                className="auth-input"
              />
              {errors.password && <div className="auth-error">{errors.password}</div>}
            </div>

            <label className="auth-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="auth-input-container">
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handlePasswordChange}
                required
                className="auth-input"
              />
              {errors.confirmPassword && <div className="auth-error">{errors.confirmPassword}</div>}
            </div>

            <button type="submit" className="auth-submit-button">
              Sign Up
            </button>

            <div className="auth-successful-message">
              {successfulRegistration && (
               <div>
                 <p>Successful registration.</p>
                 <p>You will be redirected to the Login page shortly.</p>
               </div>
              )}
            </div>

            <div className="auth-links">
              <span>Already have an account?</span>
              <a href={AppRoutes.LOGIN} className="auth-link">Login</a>
            </div>

            {errors.general && <div className="auth-error">{errors.general}</div>}

          </form>
      </div>
  );
};

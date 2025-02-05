import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../constant/constant';
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Signup.css'; // Importing the CSS file here
import { useLoading } from './LoadingContext';

const Signup = () => {
//   const [name, setName] = useState('');
    const { setLoading } = useLoading();
    const [firstName, setFirstName] = useState(''); // Separate field for first name
    const [lastName, setLastName] = useState(''); // Separate field for last name
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(0);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const[showError,setShowError] = useState(false);

    const navigate = useNavigate();

    const [showHoverCard, setShowHoverCard] = useState(false);
    const [passwordRequirements, setPasswordRequirements] = useState({
      minLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasDigit: false,
      hasSpecialChar: false,
    });
    
    const validatePassword = (password) => {
      setPasswordRequirements({
        minLength: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasDigit: /\d/.test(password),
        hasSpecialChar: /[@$!%*?&#]/.test(password),
      });
    };
    

  // Regular expressions for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  const validateForm = () => {
    let errors = {};

    // if (!name) errors.name = 'Name is required';
    if (!firstName) errors.firstName = 'First name is required';
    if (!lastName) errors.lastName = 'Last name is required';
    if (!email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Enter a valid email address';
    } else if (role === 'Recruiter' && !email.endsWith('@cumail.in')) {
      errors.email = 'Recruiters must use a work email';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (!passwordRegex.test(password)) {
      errors.password =
        'Password must be at least 8 characters, including uppercase, lowercase, digit, and special character';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    setShowError(true);
    console.log("submitted");
    event.preventDefault();
    if (validateForm()) {
        // Concatenating First Name and Last Name with a space
        const name = `${firstName.trim()} ${lastName.trim()}`;
        const formData = { name, email, password, role };
        setLoading(true);
        await fetch(`${API}/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
      })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          Swal.fire({
            title: 'Success!',
            text: 'An email has been sent to your registered email. Please verify it.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            // Redirect to login page after OK button click
            navigate('/login');
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.message,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      });
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Create an Account</h2>
              <form onSubmit={handleSubmit}>
                {/* Name */}
                {/* <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Enter your name"
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div> */}

                {/* First Name */}
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onFocus={() => setShowError(false)}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    placeholder="Enter your first name"
                  />
                  {showError && errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>

                {/* Last Name */}
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onFocus={() => setShowError(false)}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    placeholder="Enter your last name"
                  />
                  {showError && errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>


                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onFocus={() => setShowError(false)}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="Enter your email"
                  />
                  {showError && errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                {/* Password */}
                {/* <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Create a password"
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div> */}

                {/* Password with toggle visibility */}
                <div className="mb-3 position-relative">
                  <label htmlFor="password" className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onFocus={() => {
                        setShowError(false);
                       setShowHoverCard(true);
                       }} // Show hover card on focus
                      onBlur={() => setShowHoverCard(false)} // Hide hover card on blur
                      onChange={(e) => {
                        setPassword(e.target.value);
                        validatePassword(e.target.value);
                      }}
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      placeholder="Create a password"
                    />
                    <span
                      className="input-group-text"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {/* {showPassword ? "🙈" : "👁️"} */}
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                    {/* Hover Card */}
                    
                     {/* {showHoverCard && (
                      <div className="hover-card">
                        <ul className="list-unstyled">
                          <li style={{ color: passwordRequirements.minLength ? "green" : "red" }}>
                            {passwordRequirements.minLength ? "✅" : "❌"} Minimum 8 characters
                          </li>
                          <li style={{ color: passwordRequirements.hasUppercase ? "green" : "red" }}>
                            {passwordRequirements.hasUppercase ? "✅" : "❌"} At least 1 uppercase
                          </li>
                          <li style={{ color: passwordRequirements.hasLowercase ? "green" : "red" }}>
                            {passwordRequirements.hasLowercase ? "✅" : "❌"} At least 1 lowercase
                          </li>
                          <li style={{ color: passwordRequirements.hasDigit ? "green" : "red" }}>
                            {passwordRequirements.hasDigit ? "✅" : "❌"} At least 1 digit
                          </li>
                          <li style={{ color: passwordRequirements.hasSpecialChar ? "green" : "red" }}>
                            {passwordRequirements.hasSpecialChar ? "✅" : "❌"} At least 1 special character
                          </li>
                        </ul>
                      </div> 
                    )}  */}
                   
                    {/* {showHoverCard && (
                      <div className="hover-card">
                        <span className={passwordRequirements.minLength ? "green" : "red"}>
                          <span className="icon">{passwordRequirements.minLength ? "✅" : "❌"}</span>
                          Minimum 8 characters
                        </span>
                        <span className={passwordRequirements.hasUppercase ? "green" : "red"}>
                          <span className="icon">{passwordRequirements.hasUppercase ? "✅" : "❌"}</span>
                          At least 1 uppercase
                        </span>
                        <span className={passwordRequirements.hasLowercase ? "green" : "red"}>
                          <span className="icon">{passwordRequirements.hasLowercase ? "✅" : "❌"}</span>
                          At least 1 lowercase
                        </span>
                        <span className={passwordRequirements.hasDigit ? "green" : "red"}>
                          <span className="icon">{passwordRequirements.hasDigit ? "✅" : "❌"}</span>
                          At least 1 digit
                        </span>
                        <span className={passwordRequirements.hasSpecialChar ? "green" : "red"}>
                          <span className="icon">{passwordRequirements.hasSpecialChar ? "✅" : "❌"}</span>
                          At least 1 special character
                        </span>
                      </div>
                    )} */}

                    

                    {showError && errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                </div>

                

                {/* Role */}
                <div className="mb-3">
                  <label className="form-label">Role
                        <span className="text-danger">*</span>
                  </label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="role"
                        value="2"
                        checked={role === '2'}
                        onChange={(e) => setRole(e.target.value)}
                        style={{border:'1px solid black'}}
                      />
                      <label className="form-check-label">Recruiter</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="role"
                        value="3"
                        checked={role === '3'}
                        onChange={(e) => setRole(e.target.value)}
                        style={{border:'1px solid black'}}
                      />
                      <label className="form-check-label">Applicant</label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100">
                  Create Account
                </button>
              </form>

              {/* Link to Login */}
              <p className="mt-3 text-center">
                Already have an account?{' '}
                <Link to="/login" className="text-decoration-none">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

// Om Namah Shivay
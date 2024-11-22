import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../constant/constant';

const Signup = () => {
//   const [name, setName] = useState('');
    const [firstName, setFirstName] = useState(''); // Separate field for first name
    const [lastName, setLastName] = useState(''); // Separate field for last name
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Applicant');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

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
    event.preventDefault();
    if (validateForm()) {
        // Concatenating First Name and Last Name with a space
        const name = `${firstName.trim()} ${lastName.trim()}`;
        const formData = { name, email, password, role };
        await fetch(`${API}/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            navigate('/email');
          } else {
            alert(data.message || 'Signup failed');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
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
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
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
                    onChange={(e) => setLastName(e.target.value)}
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
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
                    onChange={(e) => setEmail(e.target.value)}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                {/* Password */}
                <div className="mb-3">
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
                        value="Recruiter"
                        checked={role === 'Recruiter'}
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <label className="form-check-label">Recruiter</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="role"
                        value="Applicant"
                        checked={role === 'Applicant'}
                        onChange={(e) => setRole(e.target.value)}
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
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // We'll add this CSS file for styling
import { API } from '../constant/constant';
import { FaGoogle, FaFacebook, FaLinkedin } from 'react-icons/fa'; // Import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const navigate=useNavigate();
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateForm = () => {
        let errors = {};

        if (!email) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            errors.email = "Enter a valid email address";
        }

        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = async(event) => {
        event.preventDefault();
        if (validateForm()) {
            console.log({ email, password });
            await fetch(`${API}/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email,password}),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.success) {
                    if(data.role==='1'){
                        navigate("/admin");
                    }
                    else if(data.role==='2'){
                        navigate("/recruiter");
                    }
                    else if(data.role==='3'){
                        navigate("/applicant");
                    }
                } else {
                    alert(data.message || 'Signup failed');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            // Insert API call here
        }
    };
    // Function to handle Google Login
    const handleGoogleLogin = async () => {
        window.location.href = `${API}/auth/google`; // Direct to Google login endpoint
    };

    // Function to handle LinkedIn Login
    const handleLinkedinLogin = async () => {
        window.location.href = `${API}/auth/linkedin`; // Direct to Linkedin login endpoint
    };

    // Function to handle Facebook Login
    const handleFacebookLogin = () => {
        window.location.href = `${API}/auth/facebook`; // Direct to Facebook login endpoint
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Login </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email Id<span className="text-danger">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="email"
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    {/* Password with toggle visibility */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        </div>
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
                {/* "OR" Divider */}
                 {/* "OR" Section */}
                 {/* <div className="text-center my-1">
                    <p>OR</p>
                </div> */}
                {/* <div className="text-center mt-4">
                    <p>OR</p>
                    <button className="btn btn-danger w-100" onClick={handleGoogleLogin}>
                        Login with Google
                    </button>
                </div> */}
                <div className="text-center my-4">
                    <div className="d-flex align-items-center">
                        <hr className="flex-grow-1 custom-hr" />
                        <span className="mx-3 text-muted fancy-or">OR</span>
                        <hr className="flex-grow-1 custom-hr" />
                    </div>
                </div>
                <div className="text-center mt-1">
                    {/* <p>OR</p> */}
                    <p>You can sign in with:</p>
                    <div className="d-flex justify-content-center gap-4">
                        <button className="btn btn-outline-danger" onClick={handleGoogleLogin}>
                            <FaGoogle size={20}/> 
                        </button>
                        <button className="btn btn-outline-primary" onClick={handleLinkedinLogin}>
                            <FaLinkedin size={20}/> 
                        </button>
                        <button className="btn btn-outline-primary" onClick={handleFacebookLogin}>
                            <FaFacebook size={20}/> 
                        </button>
                    </div>
                </div>

                <p className="text-center mt-3">
                    New to this website? <Link to="/signup" className="text-decoration-none">
                    Signup</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // We'll add this CSS file for styling

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
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
            await fetch(`${process.env.REACT_APP_API}/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email,password}),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.success) {
                    if(data.role==1){
                        navigate("/admin");
                    }
                    else if(data.role==2){
                        navigate("/recruiter");
                    }
                    else if(data.role==3){
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

    return (
        <div className="login-container">
            <h2 className="login-title">Login to Your Account</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            <p style={{ marginTop: '20px' }}>
                New to this website? <Link to="/signup">Signup</Link>
            </p>
        </div>
    );
};

export default Login;

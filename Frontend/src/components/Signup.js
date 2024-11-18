import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import { API } from '../constant/constant';

const Signup = () =>{
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [role,setRole] = useState('Applicant'); // default role
    const [errors,setErrors] = useState({}); // for storing error message
    const navigate=useNavigate();
    //Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    const validateForm = () => {
        let errors = {};

        if(!name) errors.name = "Name is required";
        if(!email){
            errors.email = "Email is required";
        }
        else if(!emailRegex.test(email)){
            errors.email = "Enter a valid email address";
        }
        else if(role ==="Recruiter" && !email.endsWith("@cumail.in")){
            errors.email = "Recruiters must use a work email";
        }

        if(!password){
            errors.password = "Password is required";
        }
        else if(!passwordRegex.test(password)){
            errors.password = "Password must be at least 8 characters,including uppercase,lowercase,digit,special character";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0; // return true if no errors
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        // code to submit the form data to the backend
        console.log("hello");
        if(validateForm()){
            console.log({name,email,password,role});
            const formData = {
                name,
                email,
                password,
                role
            };

            await fetch(`${API}/user/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.success) {
                    navigate("/email");
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
        <div className="signup-container">
            <h2 className="signup-title">Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text" value={name} 
                    onChange={(e)=>setName(e.target.value)} 
                    className="form-control" required />
                </div>
                <div className='form-group'>
                    <label>Email: </label>
                    <input type="email" value={email} 
                    onChange={(e)=>setEmail(e.target.value)} 
                    className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password" value={password} 
                    onChange={(e)=>setPassword(e.target.value)} 
                    className="form-control"
                    required />
                </div>
                <div className="form-group">
                    <input type='radio' name='role' value={2}  onChange = {(e)=>setRole(e.target.value)} />
                    <label>Recruiter</label>
                    <input type='radio' name='role' value={3}  onChange = {(e)=>setRole(e.target.value)} />
                    <label>Applicant</label>
                    {/* <select value ={role} 
                    onChange = {(e)=>setRole(e.target.value)} 
                    className="form-control" 
                    required>

                        <option value="Applicant">Applicant</option>
                        <option value="Recruiter">Recruiter</option>
                        <option value="Admin">Admin</option>
                    </select> */}
                </div>
                <button type="submit" className="signup-button">Create Account</button>
            </form>
            {/* Link back to Login Page */}
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
};
export default Signup;


















































// import React from 'react';
// import {Formik,Field,Form,ErrorMessage} from 'formik';
// import * as Yup from 'yup';
// import Signup from './Signup';

// export default function Signup() {
//     const initialValues = 
//     {name : '',email: '',password: '',role:''};

//     const validationSchema = Yup.object({
//         name : Yup.string().required('Name is required'),
//         email : Yup.string().email('Invalid email').required('Email is required'),
//         password : Yup.string()
//                 .min(8,'Password must be at least 8 characters')
//                 .required('Password is required'),
//         role : Yup.string().required('Please select a role'),
//     });

//     const handleSubmit = (values) => {
//         console.log('Form data',values);
//     };

//     return (
//         <Formik initialValues = {initialValues} validationSchema ={validationSchema} onSubmit={handleSubmit}>
//             <Form>
//                 <label>Name: </label>
//                 <Field type="text" name="name" />
//                 <ErrorMessage name="name" component="div" />

//                 <label>Email: </label>
//                 <Field type="email" name="email" />
//                 <ErrorMessage name="email" component="div" />

//                 <label>Password: </label>
//                 <Field type="password" name="password" />
//                 <ErrorMessage name="password" component="div" />

//                 <label>Role: </label>
//                 <Field as="select" name="role">
//                     <option value="">Select Your Role</option>
//                     <option value="Student">Student</option>
//                     <option value="Recruiter">Recruiter</option>
//                     <option value="Admin">Admin</option>
//                 </Field>
//                 <ErrorMessage name="role" component="div" />
//             </Form>
//         </Formik>
//     );
// }


import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import EmailSent from './components/EmailSent';
import RecruiterDashboard from './components/RecruiterDashboard';
import ApplicantDashboard from './components/ApplicantDashboard';
import AdminDashboard from './components/AdminDashboard';


function App() {
  return (
    <Router>
      <Routes>
        {/* <h1> CU Recruitment Portal </h1> */}
        <Route path = "/" element={<Login />} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/signup" element={<Signup />} />
        <Route path = "/email" element={<EmailSent/>} />
        <Route path = "/recruiter" element={<RecruiterDashboard/>} />
        <Route path = "/applicant" element={<ApplicantDashboard/>} />
        <Route path = "/admin" element={<AdminDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;

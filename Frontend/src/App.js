import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import EmailSent from './components/EmailSent';
import RecruiterDashboard from './components/RecruiterDashboard';
import AdminDashboard from './components/AdminDashboard';
import OTP_Login from './components/OTP_Login';
import Applicant from './Applicant/Applicant';
import Spinner from './components/Spinner';
function App() {
  return (
    <Router>
      <Spinner/>
      <Routes>
        {/* <h1> CU Recruitment Portal </h1> */}
        <Route path = "/" element={<Login />} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/signup" element={<Signup />} />
        <Route path = "/email" element={<EmailSent/>} />
        <Route path = "/recruiter" element={<RecruiterDashboard/>} />
        <Route path = "/applicant" element={<Applicant/>}/>
        <Route path = "/admin" element={<AdminDashboard/>} />
        <Route path = "/otp_login" element={<OTP_Login />} />
      </Routes>
    </Router>
  );
}

export default App;

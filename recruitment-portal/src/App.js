import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* <h1> CU Recruitment Portal </h1> */}
        <Route path = "/login" element={<Login />} />
        <Route path = "/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;

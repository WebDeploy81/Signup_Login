import axios from 'axios';
import React, { useEffect } from 'react'
import { API } from '../constant/constant';

const AdminDashboard = () => {
  const getUser= async()=>{
    const token=localStorage.getItem('token');
    const response = await axios.get(
      `${API}/admin/users`,
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        withCredentials: true,
      }
    );
    console.log(response);
  }
  useEffect(()=>{
    getUser();
  },[])
 
  return (
    <div>
      <h1>This is Admin Dashbaord</h1>
    </div>
  )
}

export default AdminDashboard

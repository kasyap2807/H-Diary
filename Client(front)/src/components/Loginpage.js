import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate  } from 'react-router-dom';
import './Forms.css';
import Navbar2 from './Navbar2';



const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  
  const config = {
    headers: {
      'Content-Type': 'application/json' // Set a different Content-Type header if needed
      // other custom headers can be added here
    }
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:1212/login', credentials, config);
      // console.log(response);
      if (response.data.message == 'yes') {
        navigate(`/landingpagelogin/${response.data.userid}/${credentials.username}`);
      } else {
        // Display error message using toast notification
        toast.error('Incorrect username or password');
      }
    } catch (error) {
      // Handle other errors (e.g., network issues) here
      // console.error('Error during login:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div class="login-container">
      <Navbar2/>
      
      {/* Toast notification container */}
      <ToastContainer />
      <div class="login-box">
        <h2>Login</h2>
        <form>
          <div class="user-box">
            <input type="text" required="" name="username" placeholder="Username" value={credentials.username} onChange={handleInputChange}/>
            <label>Username</label>
          </div>
          <div class="user-box">
            {/* FOR PRESS ENTER WORK ITS GGODUUUU */}
            <input type="password" required="" name="password" placeholder="Password" value={credentials.password} onChange={handleInputChange} onKeyPress={handleKeyPress}/>
            <label>Password</label>
          </div>
         <a onClick={handleLogin}>
        {/* <button onClick={handleLogin}> */}
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit 
          {/* </button> */}
          </a>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

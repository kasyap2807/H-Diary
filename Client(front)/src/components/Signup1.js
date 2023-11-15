import React ,{useState}from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate  } from 'react-router-dom';
import Navbar2 from './Navbar2';
import './Forms.css';

function Signup1() {
  const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        email: ''
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
      const handlechange = async () =>{
        try {
            const response = await axios.post('http://localhost:1212/register', credentials, config);
            // console.log(response);
            if (response.data.message == 'yes') {
                 navigate('/login');
            } else {
              // Display error message using toast notification
              toast.error('user already exits');
            }
          } catch (error) {
            // Handle other errors (e.g., network issues) here
            // console.error('Error during login:', error);
          }
      }
  return (
    <div>
       <Navbar2/>
       <ToastContainer />
        <div class="login-box">
        <h2>register</h2>
        <form>
          <div class="user-box">
            <input type="text" required="" placeholder="Username" value={credentials.username} name="username" onChange={handleInputChange}/>
            <label>Username</label>
          </div>
          <div class="user-box">
            <input type="password" required="" placeholder="Password"  value={credentials.password} name="password" onChange={handleInputChange}/>
            <label>Password</label>
          </div>
          <div class="user-box">
            <input type="email" required="" placeholder="email" value={credentials.email} name="email" onChange={handleInputChange}/>
            <label>Password</label>
          </div>
          <a onClick={handlechange}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Signup
          </a>
        </form>
      </div>
      </div>
 )
}

export default Signup1
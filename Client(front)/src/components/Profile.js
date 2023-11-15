import React ,{ useState ,useEffect}from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate  } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import './Forms.css';

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json' // Set a different Content-Type header if needed
          // other custom headers can be added here
        }
      };
      try {
        let response;
        response = await axios.post('http://localhost:1212/Profile',{login:username},config);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component is mounted
  }, []); // The effect runs when selectedDate or searched changes



  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    // email: ''
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
        const response = await axios.post('http://localhost:1212/UserUpdate',{username:profile.user,password:credentials.password}, config);
        // console.log(response);
        toast.error('user updated');
        navigate(`/landingpagelogin/${username}`);
        } catch (error) {
        // Handle other errors (e.g., network issues) here
        // console.error('Error during login:', error);
      }
  }
  return (
    <div>
      <Navbar/>
      <div class="login-box">
        <h2>Profile</h2>
        <form>
          <div class="user-box">
            <input type="text" required="" placeholder="Username" value={profile.user} name="username" readonly/>
            {/* <p name="username"> {Profile.user} </p> */}
            <label>Username</label>
          </div>
          <div class="user-box">
            <input type="text" required="" placeholder="Passwordnow"  value={profile.password} name="password0" readonly/>
            <label>Password</label>
          </div>
          <div class="user-box">
            <input type="Update password" placeholder="Password" name="password" onChange={handleInputChange}/>
            <label>Password</label>
          </div>
          {/* <div class="user-box">
            <input type="email" required="" placeholder="email" value={profile.email} name="email" onChange={handleInputChange}/>
            <label>Password</label>
          </div> */}
          <a onClick={handlechange}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Update
          </a>
        </form>
      </div>
    </div>
  )
}

export default Profile
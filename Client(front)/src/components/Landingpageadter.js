import React from 'react';
import './Landingpagestyle.css'
import axios from 'axios';
import { useNavigate, useSearchParams  } from 'react-router-dom';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

const Landingpageadter = () => {
    const  navigate = useNavigate();
    const { username } = useParams();
    const { name } = useParams();
    const signout = async() => {
        try {
            const response = axios.post('http://localhost:1212/signout');
            navigate('/');
        }catch (error) {
            // Handle other errors (e.g., network issues) here
            console.error('Error during login:', error);
          }
    }
    const clicker1 = () =>{
        navigate(`/Read/${username}`);
    }
    const clicker2 = () =>{
        navigate(`/Write/${username}`);
    }
    
  return (
    <div>
    <Navbar/>
    <div class="app-info">
        <br/><br/><br/><br/><br/><br/>
        <div class="app-name">Hello {name} how is the day!!</div>
        <div class="app-name ">H-Diary</div>
        <div class="app-caption">save every momment</div>
        <div class="button-align">
            <a ><button class="button" onClick={clicker1}> <span>Read</span></button><br></br></a>
            <a ><button class="button"  onClick={clicker2}><span>Write</span></button></a>
        </div>
    </div>

    <div class="quote">
        <h2 class="quote-h1">“A diary is the reflection of our own soul.”</h2>
        <p class="quote-p">Explore the world of diary writing with our app. Unlock your thoughts, one entry at a time.</p>
    </div>

    <div class="about" id="about">
        <h2>About Us</h2>
        <p>I am krishna kasyap kanuparthi this is my first MERN stack project</p>
    </div>

    <div class="footer">
        &copy; 2023 H-diary. All rights reserved.
    </div>
    </div>
  );
};

export default Landingpageadter;

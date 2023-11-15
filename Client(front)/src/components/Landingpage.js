import React from 'react';
import './Landingpagestyle.css'
import Navbar2 from './Navbar2';
const Landingpage = () => {
  return (
    <div>
    {/* <div class="navbar">
        <a href="/login">login</a>
        <a href="/register">signup</a>
        <a href='#features'>features</a>
        <a href="#about">about</a>
    </div> */}
    <Navbar2/>
    <div class="app-info">
        <br/><br/><br/><br/><br/><br/>
        <div class="app-name">H-Diary</div>
        <div class="app-caption">save every momment</div>
        <div class="button-align">
            <a href='/login'><button class="button" href='/login'> <span>Login</span></button><br></br></a>
            <a href='/register'><button class="button"><span>Signup</span></button></a>
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

export default Landingpage;

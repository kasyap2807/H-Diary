import './Navbar.css'
import React from 'react';
import './Landingpagestyle.css'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
const Navbar2 = () => {
  const  navigate = useNavigate();
    const signout = async() => {
        try {
            const response = axios.post('http://localhost:1212/signout');
            navigate('/');
        }catch (error) {
            // Handle other errors (e.g., network issues) here
            console.error('Error during login:', error);
          }
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      {/* <div className="container"> */}
        <a href="/">
          <img
            className="mr-5 border-0"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEUNDQ3///8AAAAYGBiDg4MWFhb29vYEBASHh4coKCgZGRn6+vry8vIJCQnU1NSjo6PNzc1DQ0OampoRERHk5ORbW1tycnI4ODiRkZFSUlKfn5/CwsKurq5MTEyFhYV7e3tAQEBpaWne3t66urpkZGQwMDApKSkhISGsrKwyMjJPT0/gs7xJAAAEqUlEQVR4nO2cfXOiOhSH8UBEkFhtULS+tnbXbr//B7x550U6t507klnu7/mLJJDm8SQngZndKAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDooBY9Ta0qrqv4fZUn/fr5nv4GgDanxLNZNUdIq1mSnBLmfZTLOjmdd81x8qzRQXJe33wjyYeT2ZFaf2q2HlqR3iZNyhdWj2imq34755R2+7muKq6VjyOtWh1M5uXHxTSa56c3J3zW7ZfBDRftAU6mZzcESnQ5s4bEro3bPlywu4aNRtqrwtL6VvrXeR1+lnYN1fj6DCkvm5GaLKxin6G1IqEf2ar+uJksh8EF+wydYsuQorJz18LGps/QdkEXXdjJAh3U1Vs7SQUztFOpbXi9u+uFvjacy9XHKaKtKhSM6F1X/5JVYQyXxBSrJzO+0kyyhiGtbcs5E9m2MAXTYgzXXHWQ3y62cUa8WhF3S/GXrpVLnAZfiM6QK4iOZnwb6houdf1e7ibyLmYCrxeVMzQ9yMZKl6/Ef5eUpkx3uF3Y+2m9CGXoiu/WpG3IycbWrlCa6tmnQu0NbQ/c9LgnnklNH3z9dJry4i2woQ3WtGNoxTf+h9Dra6J283vD0v5GcoaqafnsDOUeKnvfBDfUY59z3jY0RvXZzCTJ19pw55tOuvxEUSqKSUbc5bKZTjzXYJnGl83J45a2DU0gts+OJx9Ta3iw9Ve7qbxTJOQMldsDcTvxufxdShp8v/gihhHvM+zSMOxQyhBWiexMboxUmKCmcTm/0FPwWarX4by7Dn9qKJclz6TPQl45Q7mlJvQcOtPY1Hf9b4aFWqBcyEgKecz1hsu97H4Zcj9MiVb9++EPDe2ZSOWVTVIbHnJ5UK1CGQohGLu8mBHenWms4byma2irC22jt9NIHWg2lHNnyIVcAudAubQ/BneG9W5x6xoebcOnLqmzNs8EK+ZVnWnUC+OVqvTfhjSA4f27hTP0T1VdQ7fjm0ylgsj/XGmntws3S1fzktg++Btw7/vhDww/bUijNJOb/HbSyDQLuQgXgXJpg2nS847/fcM6iDJ2artoGm6l8eDvwHffaW61Rv2dhl6+b3h0ZXlVUvVaGyZm1g5tuJl5TufutzaJ/tZGO32DN+Q3VdxedELRl3/8c3RWFcpYR6yZaUhnnqH53vfSbiuvK3jnM2ndZF8lakN1qHm80ZCkNJVB87M0xJvFo5GntGamKQJ8iHo09NE4tS0/RxdCtRSP3jBdjVAwUh9a60wTeiyPwhuOFvNhbtSG+mB4GrNhVUyGf7UfFNpMimzUhhEd3sctqI61oUcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwP8XkeeMxXmex9H4/tWyIY5zIR0lIvRQHoSIY/3/88VstIq5U4xzFnosj4EZQ6Emahx6MI9BLUGpyFmu1mTo0TwAznSuYSLSYRzhTOU21wg9YUcZRWZmqb4YZbIRecy0IRvnHFWRM8swHmkE5X6Y6xCOdAlGbjtUfiPdDO1uONoZqo6lzJzZxGjfLQAAAAAAAADgr+YfLMg+pickHfMAAAAASUVORK5CYII="
            style={{ height: '50px', width: '50px' }}
            alt=""
          />
        </a>
        <a className="navbar-brand text-white" href="/">
          H-DIARY
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className='divid'>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/register">
                Signup
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#features">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#about">
                About
              </a>
            </li>
            
          </ul>
        </div>
        </div>
      {/* </div> */}
    </nav>
  );
};

export default Navbar2;

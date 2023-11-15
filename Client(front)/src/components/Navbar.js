import './Navbar.css'
import React from 'react';
import './Landingpagestyle.css'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Navbar = () => {
  const { username } = useParams();
  // const { name } = useParams();
  const  navigate = useNavigate();
    const signout = async() => {
        try {
            // const response = axios.post('http://localhost:1212/signout');
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
  const clicker3 = () =>{
    navigate(`/profile/${username}`);
}
const clicker4 = () =>{
  navigate(`/landingpagelogin/${username}`);
}
const clicker5 = () =>{
  navigate(`/ImageUpload/${username}`);
}
const clicker6 = () =>{
  navigate(`/ImageBlog/${username}`);
}
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      {/* <div className="container"> */}
        <a onClick={clicker4}>
          <img
            className="mr-5 border-0"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEUNDQ3///8AAAAYGBiDg4MWFhb29vYEBASHh4coKCgZGRn6+vry8vIJCQnU1NSjo6PNzc1DQ0OampoRERHk5ORbW1tycnI4ODiRkZFSUlKfn5/CwsKurq5MTEyFhYV7e3tAQEBpaWne3t66urpkZGQwMDApKSkhISGsrKwyMjJPT0/gs7xJAAAEqUlEQVR4nO2cfXOiOhSH8UBEkFhtULS+tnbXbr//B7x550U6t507klnu7/mLJJDm8SQngZndKAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDooBY9Ta0qrqv4fZUn/fr5nv4GgDanxLNZNUdIq1mSnBLmfZTLOjmdd81x8qzRQXJe33wjyYeT2ZFaf2q2HlqR3iZNyhdWj2imq34755R2+7muKq6VjyOtWh1M5uXHxTSa56c3J3zW7ZfBDRftAU6mZzcESnQ5s4bEro3bPlywu4aNRtqrwtL6VvrXeR1+lnYN1fj6DCkvm5GaLKxin6G1IqEf2ar+uJksh8EF+wydYsuQorJz18LGps/QdkEXXdjJAh3U1Vs7SQUztFOpbXi9u+uFvjacy9XHKaKtKhSM6F1X/5JVYQyXxBSrJzO+0kyyhiGtbcs5E9m2MAXTYgzXXHWQ3y62cUa8WhF3S/GXrpVLnAZfiM6QK4iOZnwb6houdf1e7ibyLmYCrxeVMzQ9yMZKl6/Ef5eUpkx3uF3Y+2m9CGXoiu/WpG3IycbWrlCa6tmnQu0NbQ/c9LgnnklNH3z9dJry4i2woQ3WtGNoxTf+h9Dra6J283vD0v5GcoaqafnsDOUeKnvfBDfUY59z3jY0RvXZzCTJ19pw55tOuvxEUSqKSUbc5bKZTjzXYJnGl83J45a2DU0gts+OJx9Ta3iw9Ve7qbxTJOQMldsDcTvxufxdShp8v/gihhHvM+zSMOxQyhBWiexMboxUmKCmcTm/0FPwWarX4by7Dn9qKJclz6TPQl45Q7mlJvQcOtPY1Hf9b4aFWqBcyEgKecz1hsu97H4Zcj9MiVb9++EPDe2ZSOWVTVIbHnJ5UK1CGQohGLu8mBHenWms4byma2irC22jt9NIHWg2lHNnyIVcAudAubQ/BneG9W5x6xoebcOnLqmzNs8EK+ZVnWnUC+OVqvTfhjSA4f27hTP0T1VdQ7fjm0ylgsj/XGmntws3S1fzktg++Btw7/vhDww/bUijNJOb/HbSyDQLuQgXgXJpg2nS847/fcM6iDJ2artoGm6l8eDvwHffaW61Rv2dhl6+b3h0ZXlVUvVaGyZm1g5tuJl5TufutzaJ/tZGO32DN+Q3VdxedELRl3/8c3RWFcpYR6yZaUhnnqH53vfSbiuvK3jnM2ndZF8lakN1qHm80ZCkNJVB87M0xJvFo5GntGamKQJ8iHo09NE4tS0/RxdCtRSP3jBdjVAwUh9a60wTeiyPwhuOFvNhbtSG+mB4GrNhVUyGf7UfFNpMimzUhhEd3sctqI61oUcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwP8XkeeMxXmex9H4/tWyIY5zIR0lIvRQHoSIY/3/88VstIq5U4xzFnosj4EZQ6Emahx6MI9BLUGpyFmu1mTo0TwAznSuYSLSYRzhTOU21wg9YUcZRWZmqb4YZbIRecy0IRvnHFWRM8swHmkE5X6Y6xCOdAlGbjtUfiPdDO1uONoZqo6lzJzZxGjfLQAAAAAAAADgr+YfLMg+pickHfMAAAAASUVORK5CYII="
            style={{ height: '50px', width: '50px' }}
            alt=""
          />
        </a>
        <a className="navbar-brand text-white" onClick={clicker4}>
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
        {/* <div className='divid'> */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" onClick={clicker4}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={clicker1}>
                Read
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={clicker2}>
                Write
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Blog
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" onClick={clicker5}>
                Image Upload
                </a>
                <a className="dropdown-item" onClick={clicker6}>
                Memory Viewer
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#features">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">
                About
              </a>
            </li>
            <li className="nav-item dropdown mr-5">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src="data:image/png;base64,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"
                  style={{ height: '30px', width: '30px' }}
                  alt=""
                />
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" onClick={clicker3}>
                Profile
                </a>
                <a className="dropdown-item" onClick={signout} href="/">
                  Sign Out
                </a>
              </div>
            </li>
          </ul>
        {/* </div> */}
        </div>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;

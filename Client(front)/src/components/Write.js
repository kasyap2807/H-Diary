import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import './Write.css';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

const Write = () => {
  const { username } = useParams();
  const [diaryData, setDiaryData] = useState([]);
  const [name,setName] = useState('');
  const [itra, setItra] = useState(false);
  const navigate = useNavigate();
  const d = new Date();
  const date = (d.getDate())+"-"+(d.getMonth()+1)+"-"+d.getFullYear()
  const config = {
    headers: {
      'Content-Type': 'application/json' // Set a different Content-Type header if needed
      // other custom headers can be added here
    }
  };
  
  useEffect( () => {
    const fetchData = async () => {
      try {
        let response;
        if(!itra){
          response = await axios.post('http://localhost:1212/writeload',{login:username},config);
          setItra(true);
        }
        setDiaryData(response.data.diary);
        setName(response.data.name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component is mounted
  }, []); // The effect runs when selectedDate or searched changes

  const handleSearch = async () => {
    // setSearched(true);
    let response = axios.post('http://localhost:1212/writeupdate',{login:username,diary:diaryData} ,config);
    navigate(`/landingpagelogin/${username}/${name}`);
    // console.log(response)
  };

  const backer = () =>{
    navigate(`/landingpagelogin/${username}`);
  }

   return (
    <div className='maincont'>
      <Navbar/>
      <h2> TODAY DIARY <span></span>DATE:{date}</h2>
      {/* <input type='textarea' value={diaryData.diary} onChange={(e) => setDiaryData(e.target.value)}></input> */}
      <textarea className="inpter" value={diaryData.diary} onChange={(e) => setDiaryData(e.target.value)}></textarea><br/>
      <input className="inputbutton" value="save" type='submit' onClick={handleSearch}></input>
      <button className='inputbutton' onClick={backer}>discard</button>
    </div>
  );
};

export default Write;

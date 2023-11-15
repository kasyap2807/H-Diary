import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import './Display.css';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

const Read = () => {
  const { username } = useParams();
  const [diaryData, setDiaryData] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

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
        if (searched && selectedDate) {
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
          let selectedDate11 = new Date(selectedDate).toLocaleDateString(undefined, options);
          const parts =  selectedDate11.split('/');
          if (parts.length === 3) {
            const day = parts[0].padStart(2, '0');
            const month = parts[1].padStart(2, '0');
            const year = parts[2];
             selectedDate11 = `${day}-${month}-${year}`;
          }
          // console.log(selectedDate11," ",typeof(selectedDate11));
          response = await axios.post('http://localhost:1212/readbydate', { login:username,date: selectedDate11 },config);
        } else {
          response = await axios.post('http://localhost:1212/readtop10',{login:username},config);
        }
        // console.log(response.data)
        setDiaryData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component is mounted
  }, [selectedDate, searched]); // The effect runs when selectedDate or searched changes

  const handleSearch = () => {
    setSearched(true);
  };

  // const back = () =>{
  //   setSearched(false);
  //   navigate(`/Read/${username}`);
  // }
  //back button on hold

 if(searched){
  return(
    <div>
      <Navbar/>
      {/* <div className="search-pad">
          <button id="searchbuttom" onClick={back}>back</button>
        </div> */}
    <div className="container">
          <span><strong>Date:</strong> {diaryData.date}<br /><br/><br/></span>
            {diaryData.diary}
        </div>
    </div>
  )
 }
else{
  return (
    <div>
      <Navbar/>
      <div className="search-pad">
        <label htmlFor="dateInput" className="label">Select Date:</label>
        <input
          type="date"
          id="dateInput"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button id="searchbuttom" onClick={handleSearch}>Search by Date</button>
      </div>
      {diaryData.map((entry) => (
        <div className="container" >
          <span><strong>Date:</strong> {entry.date}<br /><br/></span>
            {entry.diary}
        </div>
        ))}
    </div>
  );
        }
};

export default Read;

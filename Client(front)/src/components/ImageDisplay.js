import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import './Display.css';
import Navbar from './Navbar';

const ImageDisplay = () => {
    const { username } = useParams();
    const [diaryData, setDiaryData] = useState([]);
    const [search, setSearch] = useState([]);
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
          if (searched && search) {
            // console.log(selectedDate11," ",typeof(selectedDate11));
            response = await axios.post('http://localhost:1212/imageBysearch', { login:username,search:search },config);
          } else {
            response = await axios.post('http://localhost:1212/imageBlog',{login:username},config);
          }
          // console.log(response.data)
          setDiaryData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData(); // Call the fetchData function when the component is mounted
    }, [search, searched]); // The effect runs when selectedDate or searched changes
  
    const handleSearch = () => {
      setSearched(true);
    };

    const back = () =>{
      setSearched(false);
    }
  
   if(searched){
    return(
      <div>
        <Navbar/>
        <div className="search-pad">
          <button id="searchbuttom" onClick={back}>back</button>
        </div>
        {diaryData.map((entry) => (
          <div className="container" >
            <span><strong>title:</strong> {entry.title}<br /><br/></span>
            <span><strong>about:</strong> {entry.desc}<br /><br/></span>
            <img className="imageforret" src={entry.image} alt='image issue'/>
          </div>
          ))}
          {/* <span><strong>Titl:</strong> {diaryData.title}<br /><br/><br/></span>
    <div className="container">
    <img src={diaryData.image} alt='image issue'/> */}
        {/* </div> */}
      </div>
    )
   }
  else{
    return (
      <div>
        <Navbar/>
        <div className="search-pad">
          <label htmlFor="dateInput" className="label">Search:</label>
          <input
            type="text"
            id="dateInput"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button id="searchbuttom" onClick={handleSearch}>Search</button>
        </div>
        {diaryData.map((entry) => (
          <div className="container" >
            <span><strong>title:</strong> {entry.title}<br /><br/></span>
            <span><strong>about:</strong> {entry.desc}<br /><br/></span>
            <img className="imageforret" src={entry.image} alt='image issue'/>
          </div>
          ))}
      </div>
    );
          }
};

export default ImageDisplay;

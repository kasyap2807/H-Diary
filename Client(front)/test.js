import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Read = () => {
  const [diaryData, setDiaryData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    // Function to fetch data from the API endpoint
    const config = {
      headers: {
        'Content-Type': 'application/json' // Set a different Content-Type header if needed
        // other custom headers can be added here
      }
    };
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:1212/readtop10', config);;
        // const data = await response.json();
        console.log(response.data);
        setDiaryData(response.data); // Set the fetched data to the state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // Call the fetchData function when the component is mounted
    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once, similar to componentDidMount
  const searcher = async () =>{
    try {
      const response = await axios.post('http://localhost:1212/readbydate', config);;
      // const data = await response.json();
      console.log(response.data);
      setDiaryData(response.data); // Set the fetched data to the state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div>
      <div>
        <label htmlFor="dateInput">Select Date:</label>
        <input
          type="date"
          id="dateInput"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button onClick={fetchDataByDate}>Search by Date</button>
      </div>
      <ul>
        {diaryData.map((entry, index) => (
          <li key={index}>
            <strong>Date:</strong> {entry.date}<br />
            <strong>Diary:</strong> {entry.diary}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Read;

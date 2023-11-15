import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import './Forms.css';

const ImageUpload = () => {
  const { username } = useParams();
  const  navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [base64Image, setBase64Image] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // reader.result contains the base64 encoded image data
      const base64Image = reader.result;
      // Set the base64Image in the state
      setBase64Image(base64Image);
    };

    if (file) {
      // Read the selected file as a data URL
      reader.readAsDataURL(file);
    }
  };

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUpload = async() => {
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('topic', topic);
    formData.append('description', description);
    // console.log(base64Image);
    const config = {
        headers: {
           'Content-Type': 'application/json' // Set a different Content-Type header if needed
          // other custom headers can be added here
        }
    };
    axios.post('http://localhost:1212/imageupload', {login:username,title:topic,desc:description,image:base64Image} ,config)
    navigate(`/landingpagelogin/${username}`);
 };

  return (
    <div>
      <Navbar/>
      <div class="login-box">
        <h2>Upload</h2>
        <form>
          <div class="user-box">
            <input required="" placeholder="titile" type="text" value={topic} onChange={handleTopicChange}/>
            <label>Topic</label>
          </div>
          <div class="user-box">
          <textarea className="textarea" required="" value={description} placeholder="description" onChange={handleDescriptionChange} />
            {/* <label>description</label> */}
          </div>
          <div class="user-box">
          <input required="" type="file" onChange={handleFileChange} />
            <label>image</label>
          </div>
          <a onClick={handleUpload}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Upload
          </a>
        </form>
      </div>
    </div>
  );
};

export default ImageUpload;

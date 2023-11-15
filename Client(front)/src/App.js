// import logo from './logo.svg';
import { Route,Routes } from 'react-router-dom';
import './App.css';
import Loginpage from './components/Loginpage';
import Read from './components/Read';
import Write from './components/Write';
import Signup1 from './components/Signup1';
import Landingpage from './components/Landingpage';
import Landingpageadter from './components/Landingpageadter';
import Profile from './components/Profile';
import ImageDisplay from './components/ImageDisplay';
import ImageUpload from './components/ImageUpload';



function App() {
  return (
    <div>
    <Routes>
        <Route path='/' element={<Landingpage/>}/>
        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/Read/:username' element={<Read />}/>
        <Route path='/write/:username' element={<Write/>}/>
        <Route path='/register' element={<Signup1/>}/>
        <Route path='/landingpagelogin/:username/:name' element={<Landingpageadter/>}/>
        <Route path='/landingpagelogin/:username' element={<Landingpageadter/>}/>
        <Route path='/profile/:username' element={<Profile/>}/>
        <Route path='/ImageBlog/:username' element={<ImageDisplay/>}/>
        <Route path='/ImageUpload/:username' element={<ImageUpload/>}/>
      </Routes>
    </div>
  );
}

export default App;

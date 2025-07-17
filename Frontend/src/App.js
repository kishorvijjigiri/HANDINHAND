
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './LoginRegister/Login';
import Register from './LoginRegister/Register';
import DonarsList from './home/DonarsList';
import SearchDonar from './home/SearchDonar';
import HomePage from './navbarpages/HomePage';
import UserInfo from './home/UserInfo';
import AboutPage from './navbarpages/AboutPage';
import SuitableBloodType from './navbarpages/SuitableBloodType';
import SearchDonarPage from './navbarpages/SearchDonarPage';
import GalleryPage from './navbarpages/GalleryPage';
import DonateBloodPage from './navbarpages/DonateBloodPage';
import OuterPageSearch from './searchdonerpage/OuterPageSearch';
import UserDetails from './searchdonerpage/UserDetails';
import EditForm from './searchdonerpage/EditForm';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/userInfo" element={<UserInfo />} />
        <Route path="/searchdonar" element={<SearchDonarPage />} />
        <Route path="/search" element={<SearchDonar/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/donarsList" element={<DonarsList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/bloodtype" element={<SuitableBloodType/>} />
        <Route path="/gallery" element={<GalleryPage/>} />
        <Route path="/donateblood" element={<DonateBloodPage/>} />
        <Route path="/outer-search" element={<OuterPageSearch/>} />
        <Route path="/user-details" element={<UserDetails/>} />
        <Route path="/edit-form" element={<EditForm/>} />
      </Routes>
    </BrowserRouter>
     
    </div>
  );
}

export default App;

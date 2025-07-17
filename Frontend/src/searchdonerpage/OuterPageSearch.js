import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoandNaviBar from '../Commonfiles/LogoandNaviBar';

const OuterPageSearch = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage to log the user out
    localStorage.clear();
    
    // Navigate to the home page and prevent going back
    window.location.replace('/login');
  };

  return (
    <div className="container mt-5">
      <LogoandNaviBar/>
      <div className="row justify-content-center" style={{ marginTop: "90px" }}>
        <div className="col-md-5" style={{marginBottom:"20px"}}>
          <div className="card p-3 text-center">
            <h3>Your Details</h3>
            <p className='text-center'>View and manage your personal information.</p>
            <button className="btn btn-primary" style={{width:"100%"}} onClick={() => navigate('/user-details')}>Your Details</button>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card p-3 text-center">
            <h3>Search for Donor</h3>
            <p className='text-center'>Find and connect with potential donors easily.</p>
            <button className="btn btn-success" style={{width:"100%"}} onClick={() => navigate('/search')}>Search for Donor</button>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-10 text-center">
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default OuterPageSearch;

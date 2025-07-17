import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Make sure this path is correct
import slide1 from '../images/slide-01.jpg';
import slide2 from '../images/slide-02.jpg';
import './Slider.css'

const Slider = (props) => {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate('/donateblood'); // Navigate to the register page
  }

  const handleSearchClick = () => {
    navigate('/searchdonar'); // Navigate to the login page
  }

  return (
    <div style={{ ...props.style }}>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <ol className="carousel-indicators">
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={slide1} alt="First slide"/>
            <div className="carousel-caption cap1 d-none d-md-block">
              <h5><b>Donate Blood & Save a Life</b></h5>
              <p className='para1'>Donating blood is a simple yet powerful act of kindness that can make a profound difference in someone’s life.</p>
              <div className='butt'>
              <button onClick={handleDonateClick} className='btn btn-primary b1' >Donate Blood</button>
              <button onClick={handleSearchClick} className='btn btn-secondary b1'>Blood Required</button>
              </div>
              </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={slide2} alt="Second slide"/>
            <div className="carousel-caption cap2 d-none d-md-block">
                <center>
              <h5><b>Just One Call, Donate Blood Directly to the Patient</b></h5>
              <p className='para2'>This service ensures timely access to vital blood supplies without the need for the patient to travel, making emergency situations more manageable and increasing the chances of a successful outcome.</p>
              </center>
              <div className='butt'>
                <center>
              <button onClick={handleDonateClick} className='btn btn-primary b2'>Donate Blood</button>
              <button onClick={handleSearchClick} className='btn btn-secondary b2'>Blood Required</button>
              </center>
              </div>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>
    </div>
  );
}

export default Slider;

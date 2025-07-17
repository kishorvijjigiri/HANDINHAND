import React from 'react'
import { Container } from 'react-bootstrap';
import chartimg from '../images/blood chart.jpg';
import "./ChartGuide.css";
import {  useNavigate } from 'react-router-dom';

const ChartGuide = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/searchdonar'); 
    };
  return (
    <div className='chartmain' style={{ ...props.style }}>
        <Container>
            <h3><b>Blood Donation Compatibility: A Lifesaving Guide</b></h3>
            <div className='mainchart'>
                <div className='chartimg'>
                    <img className='img3' src={chartimg} alt='chart' width='400px'/>
                </div>
                <div className='chartcontent'>
                    <p>Blood is crucial for transporting oxygen, nutrients, and hormones throughout the body. It also plays a key role in immune defense and clotting to prevent excessive bleeding. Without blood, essential bodily functions would be severely impaired.
                    <ul>
                   <li> <b>O- Donors:</b> Can donate to all blood types; universal donor.</li>
                    <li><b>O+ Donors:</b> Can donate to all Rh-positive blood types (O+, A+, B+, AB+).</li>
                    <li><b>A- Donors:</b> Can donate to A-, A+, AB-, AB+ blood types.</li>
                    <li><b>A+ Donors:</b> Can donate to A+ and AB+ blood types.</li>
                    <li><b>B- Donors:</b> Can donate to B-, B+, AB-, AB+ blood types.</li>
                    <li><b>B+ Donors:</b> Can donate to B+ and AB+ blood types.</li>
                    <li><b>AB- Donors:</b> Can donate to AB- and AB+ blood types.</li>
                    <li><b>AB+ Donors:</b> Can only donate to AB+; universal recipient.</li></ul>
                    </p>
                    <button onClick={handleClick} className='btn btn-secondary searchbut'>Search Donar</button>
                </div>
            </div>
        </Container>
      
    </div>
  )
}

export default ChartGuide

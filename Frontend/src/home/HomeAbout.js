import React from 'react';
import "./HomeAbout.css";
import aboutimg from '../images/about img.png';
import aboutimg2 from '../images/aboutimg2.png'
import { Container } from 'react-bootstrap';

const HomeAbout = (props) => {
  return (
    <div id='aboutmain' style={{ ...props.style }}>
        <h3><b>ABOUT US</b></h3>
        <Container><div className='mainabout1'>
        
        <div className='aboutimg'>
            <img className='img1' src={aboutimg} alt='Loading' width='350px'/>
        </div>
        <div className='content'>
            
            <p>    HandInHand is an online platform dedicated to connecting blood donors with those in urgent need, striving to bridge the gap between those who are willing to give and those who require life-saving blood donations. Our mission is to create a supportive and compassionate community where anyone can easily find and reach out to a blood donor based on specific criteria such as blood group and geographical location. In a world where timely access to blood can make the difference between life and death, we are committed to making this process as seamless and accessible as possible.

By signing up on HandInHand, users provide essential details such as their blood group, location, and contact information, making it easier for those in need to find a compatible donor in their area. The platform is designed to empower individuals to take action and make a tangible difference in their communities. Whether it's an emergency situation or a planned medical procedure, HandInHand ensures that help is just a phone call away.</p></div>
        </div>
        <div className='mainabout2'>
        <div className='content'>
            <p>
            Our vision is to create a world where no one has to suffer or lose a loved one due to a lack of available blood. We understand the anxiety and urgency that comes with searching for a blood donor, and our goal is to alleviate that stress by providing a reliable and user-friendly platform. We aim to make the blood donation process not only simple and efficient but also meaningful and impactful for both the donor and the recipient.

We believe that every donation is a gift of life, and by connecting donors and recipients, we are building a network of care and generosity that transcends boundaries. The act of donating blood is a powerful statement of solidarity, and at HandInHand, we celebrate every individual who steps forward to make a difference. Join us in our life-saving mission and help create a world where everyone has access to the blood they need, when they need it. Together, we can make a lasting impact—one donation at a time. 
            </p>
        </div>
            <div className='aboutimg'>
            <img className='img2' src={aboutimg2} alt='Loading' width='350px'/>
        </div>
        </div>
       </Container>
    </div>
  )
}

export default HomeAbout

import React from 'react';
import gal1 from '../images/img1.jpg';
import gal2 from '../images/gal2.jpg';
import gal3 from '../images/gal3.avif';
import gal4 from '../images/gal4.jpg';
import gal5 from '../images/gal5.jpg';
import gal6 from '../images/img6.jpg';
import './HomeAbout.css';
import { Container } from 'react-bootstrap';
import './Gallery.css';

const Gallery = (props) => {
  return (
    
    <div className='gal' style={{ ...props.style }}>
        <Container>
        <h3><b>GALLARY</b></h3>
        <div className='images '>
            <img className='galimg ' src={gal1} alt='img'  />
            <img className='galimg ' src={gal2} alt='img' />
            <img className='galimg ' src={gal3} alt='img' />
            <img className='galimg ' src={gal4} alt='img' />
            <img className='galimg ' src={gal5} alt='img' />
            <img className='galimg ' src={gal6} alt='img' />
        </div>
        </Container>
    </div>
  )
}

export default Gallery

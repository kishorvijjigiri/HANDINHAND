import React from 'react'



import LogoandNaviBar from '../Commonfiles/LogoandNaviBar'

import Slider from '../home/Slider'
import HomeAbout from '../home/HomeAbout'
import Gallery from '../home/Gallery'
import ChartGuide from '../home/ChartGuide'

const HomePage = () => {
  return (
    <div>
        <LogoandNaviBar/>
        <Slider style={{ marginTop: "70px" }}/>
        <HomeAbout/>
        <Gallery/>
        <ChartGuide/>
    </div>
  )
}

export default HomePage

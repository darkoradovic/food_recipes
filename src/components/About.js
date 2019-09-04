import React from 'react'
import aboutImg from '../Assets/Images/ABOUTUS IMAGE.jpg'

const About = () => {
    return (
        
            <div className="row" id="about">
                <div className="col">
                    <h1 className="line">About Us</h1>
                    
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>

                </div>
                <div className="col">
                    <img src={aboutImg} alt="..." style={{height:"300px", width:'500px', marginTop:'70px'}}/>
                </div>
            </div>
        
    )
}

export default About

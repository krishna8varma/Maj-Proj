import React from "react";
import './home.css';
import video from '../../Assets/video.mp4';

import { Link } from "react-router-dom";



const Home=()=> {
    return (
        <section className='home'>
            <div className="overlay"></div>
            <video src={video} muted autoPlay loop type="video/mp4"></video>
            <div className="homeContent container">
                <div className="textDiv">
                    <span className="smallText">
                        Our Packages
                    </span>
                    <h1>Search your Holiday</h1>
                </div>
                <div className="cardDiv grid">
                    
                    <div className="destinationInput">
                        <label htmlFor="city">Starting Location:</label>
                        <div className="input flex">
                            <input type="text" placeholder="Enter name here"/>
                           
                        </div>
                    
                    </div>
               
                    <div className="destinationInput">
                        <label htmlFor="city">Ending Destination:</label>
                        
                        <div className="input flex">
                            <input type="text" placeholder="Enter name here"/>
                           
                        </div>
                    
                        
                    
                    </div>
                    <div className="dateInput">
                        <label htmlFor="date">Starting Date:</label>
                        <div className="input flex">
                            <input type="date" />
                           
                        </div>
                    
                    </div>
                    <div className="dateInput">
                        <label htmlFor="date">Ending Date:</label>
                        <div className="input flex">
                            <input type="date" />
                           
                        </div>
                    
                    </div>
                    <div className="startButton">
                       <Link to="/Page1"> <button   >Start Trip </button></Link>
                    </div>
                </div>
                
            </div>
            </section>
    )
}
export default Home;
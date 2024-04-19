import React from "react";
import './home.css';
import video from '../../Assets/video.mp4';
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import bg from '../../Assets/bg.jpg';


const Home=()=> {
    return (
        <section className='home'>
            <div className="overlay"></div>
            <img src={bg} muted autoPlay loop type="bg/jpg"></img>
            <div className="homeContent container">
                <div className="textDiv">
                    <span className="smallText">
                        Our Packages
                    </span>
                    <h1>Search your Holiday</h1>
                </div>
                <div className="cardDiv">
                  <div className="col1">
                    <div className="destinationInput">
                        <label htmlFor="city">Starting Location:</label>
                        <div className="input flex">
                            <input type="text" placeholder="Enter name here" />
                            <span className="locicon"><IoLocationOutline /></span>
                        </div>
                    
                  </div>
                  <div className="dateInput">
                  <label htmlFor="date">Starting Date:</label>
                        <div className="input flex">
                            <input type="date" />
                           
                        </div>
                   
                    </div>
                    </div>
                    <div className="col2">
                    
                    <div className="destinationInput">
                        <label htmlFor="city">Ending Destination:</label>
                        
                        <div className="input flex">
                            <input type="text" placeholder="Enter name here"/>
                            <span className="locicon"><IoLocationOutline /></span>
                        </div>
                    
                        
                    
                    </div>
                    
                   
                    <div className="dateInput">
                        <label htmlFor="date">Ending Date:</label>
                        <div className="input flex">
                            <input type="date" />
                           
                        </div>
                    
                    </div>
                    </div>
                   
                </div>
                <div className="startButton">
                       <Link to="/Page1"> <button className="propbut"  >Start Trip </button></Link>
                </div>
            </div>
            </section>
    )
}
export default Home;
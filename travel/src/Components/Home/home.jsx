import React, { useState } from "react";
import './home.css';
import axios from "axios";
// import video from '../../Assets/video.mp4';
import { IoLocationOutline } from "react-icons/io5";
// import { Link } from "react-router-dom";
import bg from '../../Assets/bg.jpg';
import { useNavigate } from 'react-router-dom';

const Home=()=> {
    const [startingLocation, setStartingLocation] = useState("");
    const [endingDestination, setEndingDestination] = useState("");
    const [startingDate, setStartingDate] = useState("");
    const [endingDate, setEndingDate] = useState("");
    const formData = {
        startingLocation,
        endingDestination,
        startingDate,
        endingDate,
    };
    const navigate = useNavigate();
    const handleFormSubmit = async (event) => {
        if(formData.startingDate==0 || formData.endingDestination==0 || formData.endingDate==0 || formData.startingDate==0){
            alert('Please fill all the feilds!');
            return
        }
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/start", formData);
            console.log("Data successfully posted startdata the server!", response.data);
            const url = `/Page1?startingLocation=${formData.startingLocation}&endingDestination=${formData.endingDestination}&startingDate=${formData.startingDate}&endingDate=${formData.endingDate}`;
            navigate(url);
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };


    return (
        <section className='home'>
            <div className="overlay"></div>
            <img src={bg} muted autoPlay loop type="bg/jpg" alt="bgimage"></img>
            <div className="homeContent container">
                <div className="textDiv">
                    <span className="smallText">
                        Our Packages
                    </span>
                    <h1>Search your Holiday</h1>
                </div>
                
                <div className="cardDiv">
                <form onSubmit={handleFormSubmit}>
                  <div className="col1">
                    <div className="destinationInput">
                        <label htmlFor="city">Starting Location:</label>
                        <div className="input flex">
                            <input type="text"
                                    id="startingLocation"
                                    name="startingLocation"
                                    placeholder="Enter starting location"
                                    value={startingLocation}
                                    onChange={(e) => setStartingLocation(e.target.value)}/>
                            <span className="locicon"><IoLocationOutline /></span>
                        </div>
                    
                  </div>
                  <div className="dateInput">
                  <label htmlFor="date">Starting Date:</label>
                        <div className="input flex">
                            <input  type="date"
                                    id="startingDate"
                                    name="startingDate"
                                    value={startingDate}
                                    onChange={(e) => setStartingDate(e.target.value)} />
                           
                        </div>
                   
                    </div>
                    </div>
                    <div className="col2">
                    
                    <div className="destinationInput">
                        <label htmlFor="city">Ending Location:</label>
                        
                        <div className="input flex">
                            <input  type="text"
                                    id="endingDestination"
                                    name="endingDestination"
                                    placeholder="Enter ending location"
                                    value={endingDestination}
                                    onChange={(e) => setEndingDestination(e.target.value)}/>
                            <span className="locicon"><IoLocationOutline /></span>
                        </div>
                    
                        
                    
                    </div>
                    
                   
                    <div className="dateInput">
                        <label htmlFor="date">Ending Date:</label>
                        <div className="input flex">
                            <input  type="date"
                                    id="endingDate"
                                    name="endingDate"
                                    value={endingDate}
                                    onChange={(e) => setEndingDate(e.target.value)} />
                           
                        </div>
                    
                    </div>
                    </div>
                     <div className="startButton">
                       <button className="propbut" type="submit" >Start Trip </button>
                </div>
                    </form>
                </div>
               
              
            </div>
           
            </section>
    )
}
export default Home;
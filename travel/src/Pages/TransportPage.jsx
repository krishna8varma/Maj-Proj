import React, { useState, useEffect} from 'react';
import Navbar from '../Components/Navbar/navbar'; // Assuming you have a Navbar component
import './transport.css'; // Import the corresponding CSS file
import { Link } from "react-router-dom";
import Map from '../Components/Map/map'; // Assuming you have a Map component
import  transport from '../Assets/transport.jpg';

import axios from 'axios';
import { TbArrowsExchange } from "react-icons/tb";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import { FaTrainSubway } from "react-icons/fa6";
import { FaBus } from "react-icons/fa";


  
const FoodPage = () => {
    
    const [foodData, setFoodData] = useState(null);
    const [selectedLocation,setSelectedLocation] = useState([28,78]);
    const [errorFlag, seterrorFlag] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    // const [selectedLocation, setSelectedLocation] = useState(null);
  useEffect(() => {
    const fetchFood = async () => {
        try {
            const response = await axios.get('http://localhost:5000/start');
            const weatherResponse = await axios.get('http://localhost:5000/weather');
            setWeatherData(weatherResponse.data.weather);
            // console.log('Hotel Data:', response.data);
            setFoodData(response.data); // Assuming tripPlan is a state variable
            // setSelectedLocation(weatherData["location"]);
        } catch (error) {
            seterrorFlag(true);
            // console.error('Error fetching Food Daata:', error);
        }
    };
  
    fetchFood();
  }, []);
  const handlePlaceClick = () => {
    setSelectedLocation(weatherData.location)
  };

  const renderFood = () => {
    if (!foodData) {
        if (errorFlag) {
          window.location.reload(); 
          }
        return <div className="loadingTripData"><p className='styling'>Please wait! <br /> </p> <br />
        <div className="spinner"></div></div>
    }
    return  <div className="">
        
    <div className='imgdiv'>
    <img src={transport} alt="" />
    <div className='contentdiv' onClick={() => handlePlaceClick(weatherData["location"])}>
      
        <p className='text1'> From</p>
       <p className='text2' >To</p>
       <span className='arrow'><TbArrowsExchange /></span>
       <p className='text3'>{foodData["startingLocation"]}</p>
       <p className='text4'>{foodData["endingDestination"]}</p>
    
    </div>
  </div> 
  <div className='TransportData'>
     <a className='link' href="https://www.in.cheapflights.com/?lang=en&utm_campaign=Generic+-+Group&utm_content=No+Location+-+flights+-+T%3Dnone+-+P%3Dflights+-+D%3DNone&utm_medium=cpc&utm_source=bing&utm_term=flights+anywhere&skipapp=true"><div className='Plane'><span className='planeicon'><MdOutlineFlightTakeoff /></span><span className='planetext'>Fly to {foodData["endingDestination"]}</span></div> </a> 
      <a className='link' href="https://www.irctc.co.in/nget/train-search"><div className='Train'><span className='trainicon'><FaTrainSubway /></span><span className='traintext'>Train to {foodData["endingDestination"]}</span></div></a>
      <a className='link' href="https://www.redbus.in/"><div className='Bus'><span className='busicon'><FaBus /></span><span className='bustext'>Bus to {foodData["endingDestination"]}</span></div> </a>
  </div>
  </div>
   }
   
    return (
        
        <div className='foodpage'>
            <Navbar />

            <div className="selection-bar">

                <button style={{"text-decoration":"underline"}} className="transport">Transport</button>
                <Link to="/HotelsPage"><button className="hotelSelected">Hotels</button></Link>
                <Link to="/TripPlanner"> <button className="trip-planner">Trip Planner</button></Link>
               <Link to="/FoodPage"><button className="foodbtn">Food</button></Link> 
            </div>

            <div className="mainContent">
                <div className='Content1'>
                {renderFood()}
                
                </div>

                <div className="Map">
                    <Map selectedLocation={selectedLocation} />
                </div>
            </div>

        </div>
    );

};
export default FoodPage;

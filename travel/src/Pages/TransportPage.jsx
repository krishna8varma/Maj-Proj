import React, { useState, useEffect} from 'react';
import Navbar from '../Components/Navbar/navbar'; // Assuming you have a Navbar component
import './transport.css'; // Import the corresponding CSS file
import { Link } from "react-router-dom";
import Map from '../Components/Map/map'; // Assuming you have a Map component

import { LuDot } from "react-icons/lu";
import axios from 'axios';

const FoodPage = () => {
    const [foodData, setFoodData] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState([28,78]);
    const [errorFlag, seterrorFlag] = useState(false);
    
    // const [selectedLocation, setSelectedLocation] = useState(null);
  useEffect(() => {
    const fetchFood = async () => {
        try {
            const response = await axios.get('http://localhost:5000/food');
            // console.log('Hotel Data:', response.data);
            setFoodData(response.data); // Assuming tripPlan is a state variable
        } catch (error) {
            seterrorFlag(true);
            // console.error('Error fetching Food Daata:', error);
        }
    };
  
    fetchFood();
  }, []);
  const handleHotelClick = (location) => {
    setSelectedLocation(location);
   
  };
   
    return (
        <div className='foodpage'>
            <Navbar />

            <div className="selection-bar">

                <button style={{"text-decoration":"underline"}} className="transport">Transport</button>
                <Link to="/HotelsPage"><button className="hotelSelected">Hotels</button></Link>
                <Link to="/TripPlanner"> <button className="trip-planner">Trip Planner</button></Link>
                <button className="foodbtn">Food</button>
            </div>

            <div className="mainContent">
                <div className='hotelss'>
                
                   
                </div>

                <div className="Map">
                    <Map selectedLocation={selectedLocation} />
                </div>
            </div>

        </div>
    );

};
export default FoodPage;

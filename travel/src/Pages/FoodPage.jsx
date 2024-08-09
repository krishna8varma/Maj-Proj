import React, { useState, useEffect} from 'react';
import Navbar from '../Components/Navbar/navbar'; // Assuming you have a Navbar component
import './food.css'; // Import the corresponding CSS file
import { Link } from "react-router-dom";
import Map from '../Components/Map/map'; // Assuming you have a Map component
// import food1 from '../Assets/food1.jpg';
// import food2 from '../Assets/food2.jpg';
// import food3 from '../Assets/food3.jpg';
// import food4 from '../Assets/food4.jpg';

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
  
    const renderFood = () => {
        
        if (!foodData) {
            if (errorFlag ) {
                window.location.reload(); 
              }
            return <div className="loadingTripData"><p className='styling'>Please wait! <br /> Loading Food Details...</p> <br />
            <div className="spinner"></div></div>
        }
        return <div className="hotelss">
          {Object.entries(foodData.food).map(([food,hotel])=> (
                //   <div className="hotel-box" key={index} onClick={() => handleHotelClick(index["location"])}>
                <div className="food-box" key={hotel} onClick={() => handleHotelClick(hotel["location"])}>
                <img src={hotel["image"].image} alt={hotel["Restaurant Name"]} />
                <div className="details">
                    <p className='heading'><b>{hotel["Restaurant Name"]} </b></p>
                    <div className="star">
                        <span class="fa fa-star checked"></span>
                    </div>
                    <p className="Rating"> {hotel["Rating"]} </p>
                    <p className="foodtype"> {hotel["Food Served"]}</p>
                </div>
                
                </div> 
                    // </div>
      
                  
                ))}
        </div>
      }
    return (
        <div className='foodpage'>
            <Navbar />

            <div className="selection-bar">

               <Link to="/TransportPage"><button className="transport">Transport</button></Link> 
                <Link to="/HotelsPage"><button className="hotelSelected">Hotels</button></Link>
                <Link to="/TripPlanner"> <button className="trip-planner">Trip Planner</button></Link>
                <button style={{"text-decoration":"underline"}}className="foodbtn">Food</button>
            </div>

            <div className="mainContent">
                <div className='hotelss'>
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

import React, { useState, useEffect} from 'react';
import Navbar from '../Components/Navbar/navbar'; // Assuming you have a Navbar component
import './transport.css'; // Import the corresponding CSS file
import { Link } from "react-router-dom";
import Map from '../Components/Map/map'; // Assuming you have a Map component
import  transport from '../Assets/transport.jpg';
import { LuDot } from "react-icons/lu";
import axios from 'axios';
import { TbArrowsExchange } from "react-icons/tb";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import { FaTrainSubway } from "react-icons/fa6";
import { FaBus } from "react-icons/fa";


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
                <div className='Content1'>
                   <div className='imgdiv'>
                     <img src={transport} alt="" />
                     <div className='contentdiv'>
                       
                         <p className='text1'> From</p>
                        <p className='text2'>To</p>
                        <span className='arrow'><TbArrowsExchange /></span>
                        <p className='text3'>Amravati</p>
                        <p className='text4'>Goa</p>
                     </div>
                   </div> 
                   <div className='TransportData'>
                       <div className='Plane'><span className='planeicon'><MdOutlineFlightTakeoff /></span><span className='planetext'>Fly to Goa</span></div> 
                       <div className='Train'><span className='trainicon'><FaTrainSubway /></span><span className='traintext'>Train to Goa</span></div>
                       <div className='Bus'><span className='busicon'><FaBus /></span><span className='bustext'>Bus to Goa</span></div> 
                   </div>

                </div>

                <div className="Map">
                    <Map selectedLocation={selectedLocation} />
                </div>
            </div>

        </div>
    );

};
export default FoodPage;

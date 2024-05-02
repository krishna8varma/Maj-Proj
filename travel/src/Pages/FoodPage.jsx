import React from 'react';
import Navbar from '../Components/Navbar/navbar'; // Assuming you have a Navbar component
import './food.css'; // Import the corresponding CSS file
import { Link } from "react-router-dom";
import Map from '../Components/Map/map'; // Assuming you have a Map component
import food1 from '../Assets/food1.jpg';
import food2 from '../Assets/food2.jpg';
import food3 from '../Assets/food3.jpg';
import food4 from '../Assets/food4.jpg';

const FoodPage = () => {

    const FoodData = [
        {
            id: 1,
            name: 'Hotel Mountain Meadows',
            image: food1,
            rating: 4.5,
           
        },
        {
            id: 2,
            name: 'Hotel Mountain Meadows',
            image: food2,
            rating: 4.2,
            
        },
        // Add more hotel data as needed
        {
            id: 3,
            name: 'Hotel Mountain Meadows',
            image: food3,
            rating: 4.0,
           
        },
        {
            id: 4,
            name: 'Hotel Mountain Meadows',
            image: food4,
            rating: 4.7,
           
        },
        {
            id: 5,
            name: 'Hotel Mountain Meadows',
            image: food2,
            rating: 4.7,
           
        },
        {
            id: 6,
            name: 'Hotel Mountain Meadows',
            image: food1,
            rating: 4.7,
           
        },
    ];

    return (
        <div className='foodpage'>
            <Navbar />

            <div className="selection-bar">

                <button className="transport">Transport</button>
                <Link to="/HotelsPage"><button className="hotelSelected">Hotels</button></Link>
                <Link to="/TripPlanner"> <button className="trip-planner">Trip Planner</button></Link>
                <button className="foodbtn">Food</button>
            </div>

            <div className="mainContent">
                <div className='hotelss'>
                    {FoodData.map((hotel) => (
                        <div className="food-box" key={hotel.id}>
                            <img src={hotel.image} alt={hotel.name} />
                            <div className="details">
                                <p className='heading'>{hotel.name} </p>
                                <div className="star">
                                    <span class="fa fa-star checked"></span>
                                </div>
                                <p className="Rating"> {hotel.rating} </p>
                                
                            </div>

                        </div>
                    ))}
                </div>

                <div className="Map">
                    <Map />
                </div>
            </div>

        </div>
    );

};
export default FoodPage;
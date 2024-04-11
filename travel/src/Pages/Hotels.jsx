import React from 'react';
import Navbar from '../Components/Navbar/navbar'; // Assuming you have a Navbar component
import './HotelsPage.css'; // Import the corresponding CSS file
import Map from '../Components/Map/map';
import { Link } from "react-router-dom";
const HotelsPage = () => {
  // Sample array of hotel details
  const hotelData = [
    {
      id: 1,
      name: 'Hotel A',
      image: 'hotel_a.jpg',
      rating: 4.5,
      price: '$100/night',
    },
    {
      id: 2,
      name: 'Hotel B',
      image: 'hotel_b.jpg',
      rating: 4.2,
      price: '$120/night',
    },
    // Add more hotel data as needed
    {
      id: 3,
      name: 'Hotel C',
      image: 'hotel_c.jpg',
      rating: 4.0,
      price: '$80/night',
    },
    {
      id: 4,
      name: 'Hotel D',
      image: 'hotel_d.jpg',
      rating: 4.7,
      price: '$150/night',
    },
    {
      id: 5,
      name: 'Hotel E',
      image: 'hotel_e.jpg',
      rating: 4.3,
      price: '$110/night',
    },
    {
      id: 6,
      name: 'Hotel F',
      image: 'hotel_f.jpg',
      rating: 4.8,
      price: '$200/night',
    },
  ];

  return (
    <div className="hotels-page">
      <Navbar />

      <div className="selection-bar">
        <div className="transport"><button>Transport</button></div>
        <div className="hotels selected"><button>Hotels</button></div>
      <Link to="/TripPlanner">  <div className="trip-planner"> <button>Trip Planner</button></div></Link>
      </div>

      <div className="main-content">
        <div className="hotels-list">
          {hotelData.map((hotel) => (
            <div className="hotel-box" key={hotel.id}>
              <img src={hotel.image} alt={hotel.name} />
              <div className="details">
                <h3>{hotel.name}</h3>
                <div className="rating">Rating: {hotel.rating}</div>
                <div className="price">Price: {hotel.price}</div>
                <button className="view-deal">View Deal</button>
              </div>
            </div>
          ))}
        </div>
        <div className="map">
          {/* Display of map */}
        <Map/>
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;
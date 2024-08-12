import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import Navbar from '../Components/Navbar/navbar'; // Assuming you have a Navbar component
import MapComponent from '../Components/Map/map'; // Assuming you have a Map component
import './TripPlanPage.css'; // Import the corresponding CSS file

const TripPlanPage = () => {
  const [expandedDay, setExpandedDay] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetch restaurant data from Google Places API
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
          {
            params: {
              location: '51.5074, -0.1278', // Replace with your coordinates
              radius: '1000000', // Search radius in meters
              type: 'restaurant',
              key: 'AIzaSyBOafEOI8TSEZGgjGfjOG2fqGn2zkzQJbY', // Replace with your API key
            },
          }
        );
        setRestaurants(response.data.results);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []); // Empty dependency array ensures this effect runs once on component mount

  const handleExpandDay = (dayIndex) => {
    setExpandedDay(expandedDay === dayIndex ? null : dayIndex);
  };

  return (
    <div className="trip-plan-page">
      <Navbar />

      <div className="selection-bar">
        <div className="transport">Transport</div>
        <div className="hotels">Hotels</div>
        <div className="trip-planner selected">Trip Planner</div>
      </div>

      <div className="main-content">
        <div className="left-half">
          <h2>
            Your travel plan is ready
            <span className="bookmark">🔖</span>
          </h2>
          {/* Display fetched restaurants */}
          <ul className="restaurants-list">
            {restaurants.map((restaurant, index) => (
              <li key={index} className="restaurant-card">
                <img src={restaurant.icon} alt={restaurant.name} />
                <div className="restaurant-details">
                  <h4>{restaurant.name}</h4>
                  <div className="restaurant-rating">
                    {Array.from({ length: restaurant.rating }, (_, index) => (
                      <span key={index} className="star">★</span>
                    ))}
                    {restaurant.rating}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="right-half">
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default TripPlanPage;
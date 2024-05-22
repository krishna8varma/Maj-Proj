import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Navbar from '../Components/Navbar/navbar'; // Assuming you have a Navbar component
import MapComponent from '../Components/Map/map'; // Assuming you have a Map component
import './TripPlanPage.css'; // Import the corresponding CSS file
import { IoIosArrowForward } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import axios from 'axios';
import { IoMdRefresh } from "react-icons/io";

const TripPlanPage = () => {
  const [expandedDay, setExpandedDay] = useState(null);
  const [tripPlanData, setTripPlan] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState([28, 78]);
  const [errorFlag, setErrorFlag] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripPlanResponse = await axios.get('http://localhost:5000/trip');
        const weatherResponse = await axios.get('http://localhost:5000/weather');
        
        setTripPlan(tripPlanResponse.data);
        setWeatherData(weatherResponse.data.weather);
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorFlag(true);
      }
    };

    fetchData();
  }, []);

  const handlePlaceClick = (location) => {
    setSelectedLocation(location);
    console.log(selectedLocation);
  };

  const handleExpandDay = (dayIndex) => {
    setExpandedDay(expandedDay === dayIndex ? null : dayIndex);
  };

  const renderTripPlan = () => {
    if (!tripPlanData) {
      if (errorFlag) {
        window.location.reload();
      }
      return <div className="loadingTripData loading-spinner2"></div>;
    }

    const tripPlanEntries = Object.entries(tripPlanData.tripPlan).slice(1);

    return (
      <div className="trip-plan">
        {tripPlanEntries.map(([day, dayData], index) => (
          <li key={index}>
            <div className="date" onClick={() => handleExpandDay(index)}>
              <div className="day">
                <span className='loc'><IoIosArrowForward /> <IoLocationSharp /></span>
                <span className="date-text">{day}</span>
                <span className="budget-text"> - Budget: {tripPlanData.Budget[index+1]}</span>
              </div>
            </div>
            {expandedDay === index && (
              <ul className="sections-list">
                {weatherData && weatherData[`Day ${index + 1}`] && (
                  <div className="weather-info">
                    <p>Condition: {weatherData[`Day ${index + 1}`].condition}</p>
                    <img src={weatherData[`Day ${index + 1}`].icon} alt={weatherData[`Day ${index + 1}`].condition} />
                    <p>Sunrise: {weatherData[`Day ${index + 1}`].sunrise}</p>
                    <p>Sunset: {weatherData[`Day ${index + 1}`].sunset}</p>
                  </div>
                )}
                {Object.entries(dayData).map(([section, sectionData], sectionIndex) => (
                  <li key={sectionIndex}>
                    <div className='dayTime'><p>{section}</p></div>
                    {sectionData["Place Name"] && (
                      <ul className="places-list">
                        <li key={sectionIndex} className="place-card" onClick={() => handlePlaceClick(sectionData["Place_location"])}>
                          <img src={sectionData.image} alt={sectionData["Place Name"]} />
                          <div className="place-details">
                            <h4>{sectionData["Place Name"]}</h4>
                            <div className='type'><p>{sectionData["Activity Type"].join(' - ')}</p></div>
                            <p className='timing'>Opening Hours: {sectionData["Opening Hours"].join(' - ')}</p>
                            <p className='starRating'><span className="fa fa-star checked"> </span> {sectionData["Rating"]}</p>
                          </div>
                        </li>
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </div>
    );
  };

  return (
    <div className="trip-plan-page">
      <Navbar />

      <div className="selection-bar">
        <button className="transport">Transport</button>
        <Link to="/HotelsPage"><button className="hotels">Hotels</button></Link>
        <button className="trip-planner">Trip Planner</button>
        <Link to="/FoodPage"><button className="foodbtn">Food</button></Link>
      </div>

      <div className="main-content">
        <div className="left-half">
          <h2>
            Your Travel Plan Is Ready!
            <a href="/tripPlanner"><span className='refresh'><IoMdRefresh /></span></a>
            <span className='save'><FiBookmark /></span>
          </h2>
          <ul>
            {renderTripPlan()}
          </ul>
        </div>
        <div className="right-half">
          <MapComponent selectedLocation={selectedLocation} />
        </div>
      </div>
    </div>
  );
};

export default TripPlanPage;

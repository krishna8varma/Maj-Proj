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
import  sunrise from '../Assets/sunrise.png';
import  sunset from '../Assets/sunset.png';
import  aqi from '../Assets/aqi.png';


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

    const { tripPlan } = tripPlanData;
    const days = Object.entries(tripPlan).filter(([key]) => key.startsWith('Day'));

    return (
      <div className="trip-plan">
        {days.map(([day, dayData], index) => {
          const budget = dayData.Budget;

          return (
            <li key={index}>
              <div className="date" onClick={() => handleExpandDay(index)}>
                <div className="day">
                  <span className='loc'><IoIosArrowForward /> <IoLocationSharp /></span>
                  <span className="date-text"> {day}</span>
                  {budget && <span className="budget-text"> {budget.join(' - ')}</span>}
                </div>
              </div>
              {expandedDay === index && (
                <ul className="sections-list">
                  {weatherData && weatherData[`Day ${index + 1}`] && (
                    <div className="weather-info">
                      
                      <p className='div1' ><img className='conditionicon' src={weatherData[`Day ${index + 1}`].icon} alt={weatherData[`Day ${index + 1}`].condition} /> <div className='conditiontext'>{weatherData[`Day ${index + 1}`].condition}</div></p>
                      
                      <p className='div1'><img className='sunriseicon' src={sunrise} alt="sunrise" /><div className='conditiontext'>{weatherData[`Day ${index + 1}`].sunrise}</div></p>
                      <p className='div1'><img className='sunseticon' src={sunset} alt="sunset" /><div className='conditiontext'>{weatherData[`Day ${index + 1}`].sunset}</div></p>
                      <p className='div1'><img className='aqiicon' src={aqi} alt="aqi" /><div className='conditiontext' >AQI : {weatherData["AQI"]}</div></p>
                    </div>
                  )}
                  {Object.entries(dayData).map(([section, sectionData], sectionIndex) => {
                    if (section === 'Budget') return null;

                    return (
                      <li key={sectionIndex}>
                        <div className='dayTime'><p>{section}</p></div>
                        {sectionData.Place_Name && (
                          <ul className="places-list">
                            <li key={sectionIndex} className="place-card" onClick={() => handlePlaceClick(sectionData.Place_location)}>
                              <img src={sectionData.image.image} alt={sectionData.image.alt_text} />
                              <div className="place-details">
                                <h4>{sectionData.Place_Name}</h4>
                                <div className='type'><p>{sectionData["Activity Type"].join(' - ')}</p></div>
                                <p className='timing'>Opening Hours: {sectionData["Opening Hours"].join(' - ')}</p>
                                <p className='starRating'><span className="fa fa-star checked"> </span> {sectionData.Rating}</p>
                              </div>
                            </li>
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </div>
    );
  };

  return (
    <div className="trip-plan-page">
      <Navbar />

      <div className="selection-bar">
    
      <Link to="/TransportPage"><button className="transport">Transport</button></Link> 
      
        <Link to="/HotelsPage"><button className="hotels">Hotels</button></Link>
        <button style={{"text-decoration":"underline"}} className="trip-planner">Trip Planner</button>
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

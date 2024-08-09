<<<<<<< Updated upstream
import React, { useState, useEffect } from 'react';
=======
import React, { useState, useEffect } from "react";
>>>>>>> Stashed changes
import { Link } from "react-router-dom";
import Navbar from '../Components/Navbar/navbar'; // Assuming you have a Navbar component
import MapComponent from '../Components/Map/map'; // Assuming you have a Map component
import './TripPlanPage.css'; // Import the corresponding CSS file
<<<<<<< Updated upstream
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
=======
import img1 from '../Assets/pg5img1.jpg';
import img2 from '../Assets/pg5img2.jpg';
// import img3 from '../Assets/pg5img3.jpg'
import img4 from '../Assets/pg5img4.jpg'
import hotel_a from '../Assets/hotel_a.jpg'
import { IoIosArrowForward } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import axios from "axios";

const TripPlanPage = () => {
  const [expandedDay, setExpandedDay] = useState(null);
  const [tripPlan, setTripPlan] = useState(null);
  // const tripPlanData = [
  //   {
  //     day: 'Saturday , ',
  //     date: 'April 6th',
  //     sections: [
  //       {
  //         title : 'Lunch',
  //         title1 : 'Morning',
  //         places: [
  //           {
  //             image: img1,
  //             name: 'Rohtang Pass',
  //             type: 'Mountain Pass',
  //             openingHours: '9:00 AM - 5:00 PM',
  //             rating: 8.5,
  //             visit : '10 AM'
  //           },
  //         ],

        
  //         restaurants: [
            
  //           {
  //             image: img2,
  //             name: 'Fine Dining Place',
  //             rating: 4.6,
  //           },
  //           {
  //             image: hotel_a,
  //             name: 'Local Cafe',
  //             rating: 4.2,
  //           },
  //           // Add more restaurants as needed
  //         ],
  //       },
  //       {
  //         title : 'Tea or Coffee',
  //         title1 : 'Afternoon',
  //         places: [
  //           {
  //             image: img4,
  //             name: 'Central Park',
  //             type: 'Park',
  //             openingHours: '6:00 AM - 10:00 PM',
  //             rating: 9.0,
  //             visit : '1 PM'
  //           },
  //         ],
  //         restaurants: [
  //           {
  //             image: hotel_a,
  //             name: 'Beachside Grill',
  //             rating: 4.5,
  //           },
  //           {
  //             image: img2,
  //             name: 'Italian Trattoria',
  //             rating: 4.3,
  //           },
  //           // Add more restaurants as needed
  //         ],
  //       },
  //       {
  //         title : 'Dinner',
  //         title1 : 'Night',
  //         places: [
  //           {
  //             image: img2 ,
  //             name: 'Café Terrace',
  //             type: 'Café',
  //             openingHours: '3:00 PM - 6:00 PM',
  //             rating: 8.2,
  //             visit : '6 PM'
  //           },
  //         ],
  //         restaurants: [
  //           {
  //             image: img2,
  //             name: 'Sushi Bar',
  //             rating: 4.4,
  //           },
  //           {
  //             image: hotel_a,
  //             name: 'Steakhouse',
  //             rating: 4.7,
  //           },
  //           // Add more restaurants as needed
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     day: 'Saturday, ',
  //     date: 'April 6th',
  //     sections: [
  //       // Add sections for Day 2 as needed
  //     ],
  //   },
  //   // Add more days as needed
  // ];
   
>>>>>>> Stashed changes

  useEffect(() => {
    const fetchTripPlanData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/trip');
        setTripPlan(response.data.tripPlan);
        console.log(tripPlan);
      } catch (error) {
        console.error('Error fetching trip plan data:', error);
      }
    };

    fetchTripPlanData();
  }, []);
   
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
                  <span className="date-text">{day}</span>
                  {budget && <span className="budget-text"> - Budget: {budget.join(' - ')}</span>}
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
                      <p>AQI :{weatherData["AQI"]}</p>
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
<<<<<<< Updated upstream
          <ul>
            {renderTripPlan()}
=======
          <ul className="date-list">
            {/* {tripPlanData.map((day, index) => (
              <li key={day.date}>
                <div className="date" onClick={() => handleExpandDay(index)}>
                  <div className="day"><span className='loc'><IoIosArrowForward /> <IoLocationSharp /></span> {day.day}
                  <span className="date-text">{day.date}</span>
                  </div>
                </div>
                {expandedDay === index && (
                  <ul className="sections-list">
                    {day.sections.map((section, sectionIndex) => (
                      <li key={sectionIndex}>
                        <div className='dayTime'><p >{section.title1}</p></div>
                        {section.places && (
                          <ul className="places-list">
                            {section.places.map((place, placeIndex) => (
                              <li key={placeIndex} className="place-card">
                                <img src={place.image} alt={place.name} />
                                <div className="place-details">
                                  <h4>{place.name}</h4>
                                    <div className='type'><p>{place.type}</p></div>  
                                  <p className='timing'>Opening Hours: {place.openingHours}</p>
                                  <p className='visit'>Visit Around : {place.visit}</p>
                                  <p className='starRating'><span class="fa fa-star checked"> </span> {place.rating}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                         <h3>{section.title}</h3>
                        {section.restaurants && (
    
                          <ul className="restaurants-list">
                            {section.restaurants.map((restaurant, restaurantIndex) => (
                              <li key={restaurantIndex} className="restaurant-card">
                                <img src={restaurant.image} alt={restaurant.name} />
                                <div className="restaurant-details">
                                  <h4>{restaurant.name}</h4>
                                  <p className='rating1'><span class="fa fa-star checked"></span> {restaurant.rating}</p>
                                </div>
                              </li>
                              
                            ))}
                          <Link to="/HotelsPage">  <p className='slidearrow'><MdArrowForwardIos /></p></Link>
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))} */}
>>>>>>> Stashed changes
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

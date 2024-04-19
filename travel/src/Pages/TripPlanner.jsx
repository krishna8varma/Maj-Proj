import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from '../Components/Navbar/navbar'; // Assuming you have a Navbar component
import MapComponent from '../Components/Map/map'; // Assuming you have a Map component
import './TripPlanPage.css'; // Import the corresponding CSS file
import img1 from '../Assets/pg5img1.jpg';
import img2 from '../Assets/pg5img2.jpg'
import img3 from '../Assets/pg5img3.jpg'
import img4 from '../Assets/pg5img4.jpg'
import hotel_a from '../Assets/hotel_a.jpg'
import { IoIosArrowForward } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";


const TripPlanPage = () => {
  const [expandedDay, setExpandedDay] = useState(null);

  const tripPlanData = [
    {
      day: 'Saturday , ',
      date: 'April 6th',
      sections: [
        {
          title : 'Lunch',
          title1 : 'Morning',
          places: [
            {
              image: img1,
              name: 'Rohtang Pass',
              type: 'Mountain Pass',
              openingHours: '9:00 AM - 5:00 PM',
              rating: 8.5,
              visit : '10 AM'
            },
          ],

        
          restaurants: [
            
            {
              image: img2,
              name: 'Fine Dining Place',
              rating: 4.6,
            },
            {
              image: hotel_a,
              name: 'Local Cafe',
              rating: 4.2,
            },
            // Add more restaurants as needed
          ],
        },
        {
          title : 'Tea or Coffee',
          title1 : 'Afternoon',
          places: [
            {
              image: img4,
              name: 'Central Park',
              type: 'Park',
              openingHours: '6:00 AM - 10:00 PM',
              rating: 9.0,
              visit : '1 PM'
            },
          ],
          restaurants: [
            {
              image: hotel_a,
              name: 'Beachside Grill',
              rating: 4.5,
            },
            {
              image: img2,
              name: 'Italian Trattoria',
              rating: 4.3,
            },
            // Add more restaurants as needed
          ],
        },
        {
          title : 'Dinner',
          title1 : 'Night',
          places: [
            {
              image: img2 ,
              name: 'Café Terrace',
              type: 'Café',
              openingHours: '3:00 PM - 6:00 PM',
              rating: 8.2,
              visit : '6 PM'
            },
          ],
          restaurants: [
            {
              image: img2,
              name: 'Sushi Bar',
              rating: 4.4,
            },
            {
              image: hotel_a,
              name: 'Steakhouse',
              rating: 4.7,
            },
            // Add more restaurants as needed
          ],
        },
      ],
    },
    {
      day: 'Saturday, ',
      date: 'April 6th',
      sections: [
        // Add sections for Day 2 as needed
      ],
    },
    // Add more days as needed
  ];

  const handleExpandDay = (dayIndex) => {
    setExpandedDay(expandedDay === dayIndex ? null : dayIndex);
  };

  return (
    <div className="trip-plan-page">
      <Navbar />

      <div className="selection-bar">
        <button className="transport">Transport</button>
        <Link to="/HotelsPage"><button className="hotels">Hotels</button></Link>        <button className="trip-planner">Trip Planner</button>
      </div>

      <div className="main-content">
        <div className="left-half">
          <h2>
            Your Travel Plan Is Ready !
            <span className='bookmark'></span><FiBookmark />
          </h2>
          <ul className="date-list">
            {tripPlanData.map((day, index) => (
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
                            <p className='slidearrow'><MdArrowForwardIos /></p>
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          
        </div>
        <div className="right-half">
          <MapComponent/>
        </div>
      </div>
    </div>
  );
};
export default TripPlanPage;
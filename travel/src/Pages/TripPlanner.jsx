import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Navbar from '../Components/Navbar/navbar'; // Assuming you have a Navbar component
import MapComponent from '../Components/Map/map'; // Assuming you have a Map component
import './TripPlanPage.css'; // Import the corresponding CSS file
import img1 from '../Assets/d2img1.jpg';
import img2 from '../Assets/food1.jpg';
// import img3 from '../Assets/pg5img3.jpg'
import img4 from '../Assets/d1img1.jpg'
import hotel_a from '../Assets/hotel_a.jpg'
import { IoIosArrowForward } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import axios from 'axios';
import { IoMdRefresh } from "react-icons/io";

const TripPlanPage = () => {
  const [expandedDay, setExpandedDay] = useState(null);
  const [tripPlan, settripPlan] = useState(null);

  const tripPlanData = [
    {
      day: 'Saturday , ',
      date: 'April 6th',
      sections: [
        {
          
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

        
         
        },
        {
          
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
         
        },
        {
          
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

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/trip'); // Adjust the URL to your backend API endpoint
            settripPlan(response.data.tripPlan);
            console.log(tripPlan);
        } catch (error) {

            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);
  const handleExpandDay = (dayIndex) => {
    setExpandedDay(expandedDay === dayIndex ? null : dayIndex);
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
            Your Travel Plan Is Ready !
            <span className='refresh'>  <IoMdRefresh /></span>
            <span className='save'><FiBookmark /></span>
            
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
                        {/* {section.restaurants && (
    
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
                        )} */}
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
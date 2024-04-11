import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from '../Components/Navbar/navbar'; // Assuming you have a Navbar component
import MapComponent from '../Components/Map/map'; // Assuming you have a Map component
import './TripPlanPage.css'; // Import the corresponding CSS file
import img1 from '../Assets/pg5img1.jpg';
import img2 from '../Assets/pg5img2.jpg'
import img3 from '../Assets/pg5img3.jpg'
import img4 from '../Assets/pg5img4.jpg'
const TripPlanPage = () => {
  const [expandedDay, setExpandedDay] = useState(null);

  const tripPlanData = [
    {
      day: 'Day 1',
      date: 'April 10, 2024',
      sections: [
        {
          title: 'Morning',
          places: [
            {
              image: img1,
              name: 'Historical Museum',
              type: 'Museum',
              openingHours: '9:00 AM - 5:00 PM',
              rating: 8.5,
            },
          ],
          restaurants: [
            {
              image: img2,
              name: 'Fine Dining Place',
              rating: 4.6,
            },
            {
              image: img3,
              name: 'Local Cafe',
              rating: 4.2,
            },
            // Add more restaurants as needed
          ],
        },
        {
          title: 'Afternoon',
          places: [
            {
              image: img4,
              name: 'Central Park',
              type: 'Park',
              openingHours: '6:00 AM - 10:00 PM',
              rating: 9.0,
            },
          ],
          restaurants: [
            {
              image: 'restaurant3.jpg',
              name: 'Beachside Grill',
              rating: 4.5,
            },
            {
              image: 'restaurant4.jpg',
              name: 'Italian Trattoria',
              rating: 4.3,
            },
            // Add more restaurants as needed
          ],
        },
        {
          title: 'Night',
          places: [
            {
              image: 'place3.jpg',
              name: 'Café Terrace',
              type: 'Café',
              openingHours: '3:00 PM - 6:00 PM',
              rating: 8.2,
            },
          ],
          restaurants: [
            {
              image: 'restaurant5.jpg',
              name: 'Sushi Bar',
              rating: 4.4,
            },
            {
              image: 'restaurant6.jpg',
              name: 'Steakhouse',
              rating: 4.7,
            },
            // Add more restaurants as needed
          ],
        },
      ],
    },
    {
      day: 'Day 2',
      date: 'April 11, 2024',
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
        <div className="transport">Transport</div>
        <Link to="/HotelsPage"><div className="hotels">Hotels</div></Link>
        <div className="trip-planner selected">Trip Planner</div>
      </div>

      <div className="main-content">
        <div className="left-half">
          <h2>
            Your travel plan is ready
            <span className="bookmark">🔖</span>
          </h2>
          <ul className="date-list">
            {tripPlanData.map((day, index) => (
              <li key={day.date}>
                <div className="date" onClick={() => handleExpandDay(index)}>
                  <div className="day">{day.day}</div>
                  <div className="date-text">{day.date}</div>
                </div>
                {expandedDay === index && (
                  <ul className="sections-list">
                    {day.sections.map((section, sectionIndex) => (
                      <li key={sectionIndex}>
                        <h3>{section.title}</h3>
                        {section.places && (
                          <ul className="places-list">
                            {section.places.map((place, placeIndex) => (
                              <li key={placeIndex} className="place-card">
                                <img src={place.image} alt={place.name} />
                                <div className="place-details">
                                  <h4>{place.name}</h4>
                                  <p>Type: {place.type}</p>
                                  <p>Opening Hours: {place.openingHours}</p>
                                  <p>Rating: {place.rating}/10</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                        {section.restaurants && (
                          <ul className="restaurants-list">
                            {section.restaurants.map((restaurant, restaurantIndex) => (
                              <li key={restaurantIndex} className="restaurant-card">
                                <img src={restaurant.image} alt={restaurant.name} />
                                <div className="restaurant-details">
                                  <h4>{restaurant.name}</h4>
                                  <p>Rating: {restaurant.rating}</p>
                                </div>
                              </li>
                            ))}
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
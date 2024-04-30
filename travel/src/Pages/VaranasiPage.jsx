import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Navbar from '../Components/Navbar/navbar'; // Assuming you have a Navbar component
import MapComponent from '../Components/Map/map'; // Assuming you have a Map component
import  d1i1 from '../Assets/d1i1.jpg';
import  d1i2 from '../Assets/d1i2.jpg';
import  d1i3 from '../Assets/d1i3.jpg';
import  d2i1 from '../Assets/d2i1.jpg';
import  d2i2 from '../Assets/d2i2.jpg';
import  d2i3 from '../Assets/d2i3.jpg';
import  d3i1 from '../Assets/d3i1.jpg';
import  d3i2 from '../Assets/d3i2.jpg';
import  d3i3 from '../Assets/d3i3.jpg';
import  d4i1 from '../Assets/d4i1.jpg';
import  d4i2 from '../Assets/d4i2.jpg';
import  d4i3 from '../Assets/d4i3.jpg';
import  d5i1 from '../Assets/d5i1.jpg';
import  d5i2 from '../Assets/d5i2.jpg';
import  d5i3 from '../Assets/d5i3.jpg';
import { IoIosArrowForward } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";
import './manali.css'; // Import the corresponding CSS file



const Manalipage = () => {
    const [expandedDay, setExpandedDay] = useState(null);
    const [tripPlan, settripPlan] = useState(null);

    const tripPlanData = [
        {
            day: 'Day 1 ',
           
            sections: [
                {

                    title1: 'Morning',
                    places: [
                        {
                            image:d1i1,
                            name: 'Assi Ghat',
                            type: 'Yoga Session',
                            openingHours: '24 Hours',
                            rating: 4.5,
                            visit: '6:00 AM'
                        },
                    ],



                },
                {

                    title1: 'Afternoon',
                    places: [
                        {
                            image:d1i2,
                            name: 'Dashashwamedh Ghat',
                            type: 'Evening Ritual',
                            openingHours: '24 Hours',
                            rating: 4.7,
                            visit: '05:00 PM'
                        },
                    ],

                },
                {

                    title1: 'Evening',
                    places: [
                        {
                            image: d1i3,
                            name: 'Godowlia Market',
                            type: 'Food Tour',
                            openingHours: '10:00 AM - 10:00 PM',
                            rating: 4.2,
                            visit: '7:00 PM'
                        },
                    ],

                },
            ],
        },
        {
            day: 'Day 2 ',
            
            sections: [
                // Add sections for Day 2 as needed
                {

                    title1: 'Morning',
                    places: [
                        {
                            image: d2i1,
                            name: 'Kashi Vishwanath Temple',
                            type: 'Spiritual Visit',
                            openingHours: ' 2:30 AM - 11:00 PM',
                            rating: 4.8,
                            visit: '9:00 AM'
                        },
                    ],



                },
                {

                    title1: 'Afternoon',
                    places: [
                        {
                            image:d2i2,
                            name: 'Ramnagar Fort',
                            type: 'Historical Visit',
                            openingHours: '10:00 AM - 5:00 PM',
                            rating:4.0 ,
                            visit: '02:00 PM'
                        },
                    ],

                },
                {

                    title1: 'Evening',
                    places: [
                        {
                            image: d2i3,
                            name: 'Darbhanga Ghat',
                            type: 'Photography',
                            openingHours: '24 hours',
                            rating: 4.6,
                            visit: 'Sunset'
                        },
                    ],

                },
            ],
        },
        // Add more days as needed
        {
            day: 'Day 3 ',
            
            sections: [
                // Add sections for Day 2 as needed
                {

                    title1: 'Morning',
                    places: [
                        {
                            image: d3i1,
                            name: 'Sarnath',
                            type: 'Museum',
                            openingHours: 'Sunrise to Sunset',
                            rating: 4.5,
                            visit: ' 08:00 AM'
                        },
                    ],



                },
                {

                    title1: 'Afternoon',
                    places: [
                        {
                            image:d3i2,
                            name: 'Local Cooking Class',
                            type: 'Cooking Class',
                            openingHours: 'Afternoon sessions',
                            rating:  4.5,
                            visit: ' 02:00 PM'
                        },
                    ],

                },
                {

                    title1: 'Evening',
                    places: [
                        {
                            image: d3i3,
                            name: 'Blue Lassi Shop',
                            type: 'Yogurt Drink',
                            openingHours: '8:00 AM - 10:00 PM',
                            rating: 4.6,
                            visit: '06:00 PM'
                        },
                    ],

                },
            ],
        },
        {
            day: 'Day 4 ',
            
            sections: [
                // Add sections for Day 2 as needed
                {

                    title1: 'Morning',
                    places: [
                        {
                            image: d4i1,
                            name: 'Banaras Hindu University Campus',
                            type: 'Wandering',
                            openingHours: '9:00 AM - 5:00 PM',
                            rating:  4.2,
                            visit: ' 10:00 AM'
                        },
                    ],



                },
                {

                    title1: 'Afternoon',
                    places: [
                        {
                            image: d4i2,
                            name: 'Sarai Mohana',
                            type: 'Weaving',
                            openingHours: '10:00 AM - 6:00 PM',
                            rating: 4.0,
                            visit: '2:00 PM'
                        },
                    ],

                },
                {

                    title1: 'Evening',
                    places: [
                        {
                            image: d4i3,
                            name: 'New Vishwanath Temple (BHU)',
                            type: 'Spiritual Visit',
                            openingHours: ' 4:00 AM - 9:00 PM',
                            rating:4.7,
                            visit: '07:00 PM'
                        },
                    ],

                },
            ],
        },
        {
            day: 'Day 5',
            
            sections: [
                // Add sections for Day 2 as needed
                {

                    title1: 'Morning',
                    places: [
                        {
                            image: d5i1,
                            name: 'Boat Ride on the Ganges',
                            type: 'Boat Ride',
                            openingHours: '  09:00 AM - 05:00 PM',
                            rating: 4.7,
                            visit: ' Sunrise'
                        },
                    ],



                },
                {

                    title1: 'Afternoon',
                    places: [
                        {
                            image: d5i2,
                            name: 'Local Cricket Ground',
                            type: 'Cricket',
                            openingHours: 'Early Morning',
                            rating: 4.5,
                            visit: ' 6:00 AM'
                        },
                    ],

                },
                {

                    title1: 'Evening',
                    places: [
                        {
                            image:d5i3,
                            name: 'Farewell Dinner at Ganges-view Restaurant',
                            type: 'Food Tour',
                            openingHours: '7:00 PM onwards',
                            rating: 4.5,
                            visit: ' 08:00 PM'
                        },
                    ],

                },
            ],
        },
    ];


    const handleExpandDay = (dayIndex) => {
        setExpandedDay(expandedDay === dayIndex ? null : dayIndex);
    };
    return (
        <div className='manali'>
            <Navbar />
            <div className="selection-bar">
                <button className="transport">Transport</button>
                <Link to="/HotelsPage"><button className="hotels">Hotels</button></Link>
                <Link to="/TripPlanner"><button className="trip-planner">Trip Planner</button></Link>
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
                                                                    <h4 >{place.name}</h4>
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

                                            </li>
                                        ))}
                                    </ul>
                                )}
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
export default Manalipage;
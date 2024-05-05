import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Navbar from '../Components/Navbar/navbar'; // Assuming you have a Navbar component
import MapComponent from '../Components/Map/map'; // Assuming you have a Map component
import  d1img1 from '../Assets/d1img1.jpg';
import  d1img2 from '../Assets/d1img2.jpg';
import  d1img3 from '../Assets/d1img3.jpg';
import  d2img1 from '../Assets/d2img1.jpg';
import  d2img2 from '../Assets/d2img2.jpg';
import  d2img3 from '../Assets/d2img3.jpg';
import  d3img1 from '../Assets/d3img1.jpg';
import  d3img2 from '../Assets/d3img2.jpg';
import  d3img3 from '../Assets/d3img3.jpg';
import  d4img1 from '../Assets/d4img1.jpg';
import  d4img2 from '../Assets/d4img2.jpg';
import  d4img3 from '../Assets/d4img3.jpg';
import  d5img1 from '../Assets/d5img1.jpg';
import  d5img2 from '../Assets/d5img2.jpg';
import  d5img3 from '../Assets/d5img3.jpg';
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
                            image: d1img1,
                            name: 'Hidimba Devi Temple',
                            type1 : ' Religious Site',
                            type2 : ' Temple Visit',
                            openingHours: '08:00 AM - 06:00 PM',
                            rating: 4.5,
                            
                        },
                    ],



                },
                {

                    title1: 'Afternoon',
                    places: [
                        {
                            image:d1img2,
                            name: 'Manali Nature Park',
                            type1: 'Nature walks',
                            type2: 'Family hikes',
                            openingHours: '8:00 AM - 7:00 PM',
                            rating: 4.0,
                            visit: '02:00 PM'
                        },
                    ],

                },
                {

                    title1: 'Evening',
                    places: [
                        {
                            image: d1img3,
                            name: 'Mall Road',
                            type1: 'Shopping',
                            type2: 'Exploring',
                            openingHours: '9:00 AM - 5:00 PM',
                            rating: 4.7,
                            visit: ' 6:00 PM'
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
                            image: d2img1,
                            name: 'Solang Valley',
                            type1: 'Gondola rides',
                            type2: 'Nature walks',
                            openingHours: '09:00 AM - 6:00 PM',
                            rating: 4.6,
                            visit: '11:00 AM'
                        },
                    ],



                },
                {

                    title1: 'Afternoon',
                    places: [
                        {
                            image: d2img2,
                            name: 'Vashisht Hot Springs',
                            type1: 'Hot spring soaking',
                            type2: 'Sightseeing',
                            openingHours: '07:00 AM - 10:00 PM',
                            rating: 4.0,
                            visit: '03:00 PM'
                        },
                    ],

                },
                {

                    title1: 'Evening',
                    places: [
                        {
                            image: d2img3,
                            name: 'Drifters Cafe & Bar',
                            type1: 'Cafe hopping',
                            type2: 'Exploring',
                            openingHours: '11:00 AM - 11:00 PM',
                            rating: 4.2,
                            visit: '07:00 PM'
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
                            image: d3img1,
                            name: 'Jogini Falls',
                            type1: 'Family Hikes',
                            type2: 'Sightseeing',
                            openingHours: 'Sunrise to Sunset',
                            rating: 4.5,
                            visit: '10:00 AM'
                        },
                    ],



                },
                {

                    title1: 'Afternoon',
                    places: [
                        {
                            image:d3img2,
                            name: 'Himalayan Nyingmapa Buddhist Temple',
                            type1: 'Monastery visit',
                            type2: 'Sightseeing',
                            openingHours: '06:00 AM - 07:00 PM',
                            rating: 4.7,
                            visit: ' 02:00 PM'
                        },
                    ],

                },
                {

                    title1: 'Evening',
                    places: [
                        {
                            image: d3img3,
                            name: 'Johnsons Cafe',
                            type1: 'Cafe hopping',
                            type2: 'Exploring',
                            openingHours: '09:00 AM - 10:00 PM',
                            rating: 4.3,
                            visit: '7:00 PM'
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
                            image: d4img1,
                            name: 'Manu Temple',
                            type1: 'Temple visits',
                            type2: 'Religious Site',
                            openingHours: '06:00 AM - 05:00 PM',
                            rating: 4.3,
                            visit: '10:00 AM'
                        },
                    ],



                },
                {

                    title1: 'Afternoon',
                    places: [
                        {
                            image: d4img2,
                            name: 'Museum of Himachal Culture & Folk Art',
                            type1: 'Museum exploration',
                            type2: 'Sightseeing',
                            openingHours: '08:00 AM - 01:00 PM and 02:00 PM - 05:00 PM',
                            rating: 4.0,
                            visit: '02:00 PM'
                        },
                    ],

                },
                {

                    title1: 'Evening',
                    places: [
                        {
                            image: d4img3,
                            name: 'Old Manali Market',
                            type1: 'Shopping',
                            type2: 'Exploring',
                            openingHours: '10:00 AM - 08:00 PM',
                            rating:4.1,
                            visit: '06:00 PM'
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
                            image: d5img1,
                            name: 'Naggar Castle',
                            type1: 'Sightseeing',
                            type2: 'Nature Walks',
                            openingHours: '09:00 AM - 05:00 PM',
                            rating: 4.4,
                            visit: '11:00 AM'
                        },
                    ],



                },
                {

                    title1: 'Afternoon',
                    places: [
                        {
                            image: d5img2,
                            name: 'Beas River',
                            type1: 'Boating',
                            type2: 'Sightseeing',
                            openingHours: 'Sunrise to Sunset',
                            rating: 4.5,
                            visit: '03:00 PM'
                        },
                    ],

                },
                {

                    title1: 'Evening',
                    places: [
                        {
                            image:d5img3,
                            name: 'Il Forno',
                            type1: 'Cafe hopping',
                            type2: 'Exploring',
                            openingHours: '11:00 AM - 11:00 PM',
                            rating: 4.6,
                            visit: ' 07:00 PM'
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
                <p className="transport1">Transport</p>
                <p className="hotels1">Hotels</p>
                <p className="trip-planner1">Trip Planner</p>
                <p className="foodbtn1">Food</p>
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
                                                                    <h4 className='naming'>{place.name}</h4>
                                                                    <div className='type1'><p>{place.type1}</p></div>
                                                                    <div className='type2'><p>{place.type2}</p></div>
                                                                    <p className='timing'>Opening Hours: {place.openingHours}</p>
                                                                   
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
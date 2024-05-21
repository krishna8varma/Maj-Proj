import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Navbar from '../Components/Navbar/navbar'; // Assuming you have a Navbar component
import MapComponent from '../Components/Map/map'; // Assuming you have a Map component
import  day1img1 from '../Assets/day1img1.jpg';
import  day1img2 from '../Assets/day1img2.jpg';
import  day1img3 from '../Assets/day1img3.jpg';
import  day2img1 from '../Assets/day2img1.jpg';
import  day2img2 from '../Assets/day2img2.jpg';
import  day2img3 from '../Assets/day2img3.jpg';
import  day3img1 from '../Assets/day3img1.jpg';
import  day3img2 from '../Assets/day3img2.jpg';
import  day3img3 from '../Assets/day3img3.jpg';
import  day4img1 from '../Assets/day4img1.jpg';
import  day4img2 from '../Assets/day4img2.jpg';
import  day4img3 from '../Assets/day4img3.jpg';
import  day5img1 from '../Assets/day5img1.jpg';
import  day5img2 from '../Assets/day5img2.jpg';
import  day5img3 from '../Assets/day5img3.jpg';
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
                            image: day1img1,
                            name: 'Calangute Beach',
                            type1: ' Beach',
                            type2: 'Water sports',
                            openingHours: '24 Hours',
                            rating: 4.5,
                            visit: '9:00 AM - 11:00 AM'
                        },
                    ],



                },
                {

                    title1: 'Afternoon',
                    places: [
                        {
                            image:day1img2,
                            name: 'Baga Beach',
                            type1: 'Water Sports',
                            type2: 'Beach hopping',
                            openingHours: '9:00 AM - 6:00 PM',
                            rating: 4.2,
                            visit: '1:00 PM - 3:00PM'
                        },
                    ],

                },
                {

                    title1: 'Evening',
                    places: [
                        {
                            image: day1img3,
                            name: 'Anjuna Flea Market',
                            type1: 'Shopping',
                            type2: 'Food tasting',
                            openingHours: '6:00 AM - 12:00 AM',
                            rating: 4.0,
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
                            image: day2img1,
                            name: 'Candolim Beach Parasailing',
                            type1: 'Parasailing',
                            type2: 'Water sports',
                            openingHours: '10:00 AM - 5:00 PM',
                            rating: 4.4,
                            visit: ' 10:00 PM - 12:00 PM'
                        },
                    ],



                },
                {

                    title1: 'Afternoon',
                    places: [
                        {
                            image: day2img2,
                            name: 'Mandovi River Cruise',
                            type1: 'Cruise',
                            type2: 'Food tasting',
                            openingHours: '4:00 PM - 6:00 PM',
                            rating: 4.8,
                            visit: '4:00 PM - 5:30 PM'
                        },
                    ],

                },
                {

                    title1: 'Evening',
                    places: [
                        {
                            image: day2img3,
                            name: 'Tito’s Nightclub',
                            type1: 'Nightlife',
                            type2: 'Club',
                            openingHours: '9:00 PM - 4:00 AM',
                            rating: 4.6,
                            visit: '6:00 PM'
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
                            image: day3img1,
                            name: 'Beach Volleyball at Palolem Beach',
                            type1: 'Sport',
                            type2: 'Beach hopping',
                            openingHours: '9:00 AM - 11:00 AM',
                            rating: 4.0,
                            visit: ' 9:00 AM - 10:30 AM'
                        },
                    ],



                },
                {

                    title1: 'Afternoon',
                    places: [
                        {
                            image:day3img2,
                            name: 'Vagator Beach',
                            type1: 'sightseeing',
                            type2: 'Beach',
                            openingHours: '24 hours',
                            rating: 4.3,
                            visit: ' 1:00 PM - 4:00 PM'
                        },
                    ],

                },
                {

                    title1: 'Evening',
                    places: [
                        {
                            image: day3img3,
                            name: 'Arpora Night Market',
                            type1: 'Shopping',
                            type2: 'Nightlife',
                            openingHours: '6:00 PM - 12:00 AM',
                            rating: 4.1,
                            visit: '7:00 PM - 9:00 PM'
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
                            image: day4img1,
                            name: 'Backwaters Kayaking',
                            type1: 'Kayaking',
                            type2: 'Exploring',
                            openingHours: '9:00 AM - 11:00 AM',
                            rating: 4.5,
                            visit: '9:00 AM - 10:30 AM'
                        },
                    ],



                },
                {

                    title1: 'Afternoon',
                    places: [
                        {
                            image: day4img2,
                            name: 'Grand Island Snorkeling',
                            type1: 'Snorkeling',
                            type2: 'Water Sport',
                            openingHours: '1:00 PM - 3:00 PM',
                            rating: 4.7,
                            visit: '1:00 PM - 2:30 PM'
                        },
                    ],

                },
                {

                    title1: 'Evening',
                    places: [
                        {
                            image: day4img3,
                            name: 'Chapora River Sunset Cruise',
                            type1: 'Cruise',
                            type2: 'Nightlife',
                            openingHours: '5:00 PM - 7:00 PM',
                            rating:4.5,
                            visit: '5:00 PM - 6:30 PM'
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
                            image: day5img1,
                            name: 'Aguada Fort',
                            type1: 'Historical',
                            type2: 'Fort exploration',
                            openingHours: ' 9:30 AM - 6:00 PM',
                            rating: 4.6,
                            visit: ' 9:30 AM - 11:00 AM'
                        },
                    ],



                },
                {

                    title1: 'Afternoon',
                    places: [
                        {
                            image: day5img2,
                            name: 'Colva Beach Water Sports',
                            type1: 'Water Sports',
                            type2: 'Beach',
                            openingHours: '9:00 AM - 6:00 PM',
                            rating: 4.0,
                            visit: '2:00 PM - 4:00 PM'
                        },
                    ],

                },
                {

                    title1: 'Evening',
                    places: [
                        {
                            image:day5img3,
                            name: 'Palolem Beach',
                            type1: 'Beach',
                            type2: 'Sightseeing',
                            openingHours: '24 hours',
                            rating: 4.4,
                            visit: '5:00 PM - 7:00 PM'
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
                                                                    <h4>{place.name}</h4>
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
                    <MapComponent selectedLocation={[15.29,74.12]}/>
                </div>
            </div>
        </div>
    );
};
export default Manalipage;
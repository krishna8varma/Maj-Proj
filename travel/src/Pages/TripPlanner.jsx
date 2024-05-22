import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Navbar from '../Components/Navbar/navbar'; // Assuming you have a Navbar component
import MapComponent from '../Components/Map/map'; // Assuming you have a Map component
import './TripPlanPage.css'; // Import the corresponding CSS file
// import img1 from '../Assets/d2img1.jpg';
// import img2 from '../Assets/food1.jpg';
// import img3 from '../Assets/pg5img3.jpg'
// import img4 from '../Assets/d1img1.jpg'
// import hotel_a from '../Assets/hotel_a.jpg'
import { IoIosArrowForward } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
// import { MdArrowForwardIos } from "react-icons/md";
import axios from 'axios';
import { IoMdRefresh } from "react-icons/io";

const TripPlanPage = () => {
  const [expandedDay, setExpandedDay] = useState(null);
  const [tripPlanData, setTripPlan] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState([28,78]);
  const [errorFlag, seterrorFlag] = useState(false);

useEffect(() => {
    const fetchTripPlan = async () => {
        try {
            const response = await axios.get('http://localhost:5000/trip');
          
            console.log('Trip Plan Data:', response.data);
            setTripPlan(response.data); // Assuming tripPlan is a state variable
        } catch (error) {
            seterrorFlag(true);
            // console.error('Error fetching trip plan:', error);
        }
    };

    fetchTripPlan();
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
      
      if(errorFlag){
       
        window.location.reload();
      }
        return <div className="loadingTripData loading-spinner2">
        
          </div>;
    }

    return <div className="trip-plan">
    {Object.entries(tripPlanData.tripPlan).map(([day, index])=> (
  <li key={index}>
    <div className="date" onClick={() => handleExpandDay(index)}>
      <div className="day"><span className='loc'><IoIosArrowForward /> <IoLocationSharp /></span> 
      <span className="date-text">  {day}</span>
      </div>
    </div>
    {expandedDay === index && (
      <ul className="sections-list">
        {Object.entries(index).map(([section, sectionIndex]) => (
          <li key={sectionIndex}>
            <div className='dayTime'><p >{section}</p></div>
            { sectionIndex["Place Name"]&& (
              <ul className="places-list">
                <div onClick={() => handlePlaceClick(sectionIndex["location"])}></div>
                  <li key={sectionIndex} className="place-card" onClick={() => handlePlaceClick(sectionIndex["Place_location"])}>
                    <img src={sectionIndex.image} alt={sectionIndex["Place Name"]} />
                    <div className="place-details">
                      <h4>{sectionIndex ["Place Name"]}</h4>
                        <div className='type'><p>{sectionIndex["Activity Type"].join(' - ')}</p></div>  
                      <p className='timing'>Opening Hours: {sectionIndex ["Opening Hours"].join(' - ')}</p>
                      {/* <p className='visit'>Visit Around : {place.visit}</p> */}
                      <p className='starRating'><span class="fa fa-star checked"> </span> {sectionIndex["Rating"]}</p>
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
           <a href="/tripPlanner"><span className='refresh'>  <IoMdRefresh /></span></a> 
            <span className='save'><FiBookmark /></span>
            
          </h2>
           <ul>
            {renderTripPlan()}
            </ul>
           
          
        </div>
        <div className="right-half">
          <MapComponent selectedLocation={selectedLocation}/>
        </div>
      </div>
    </div>
  );
};
export default TripPlanPage;
// {Object.entries(tripPlanData.tripPlan).map(([day, index])=> (
//   <li key={index}>
//     <div className="date" onClick={() => handleExpandDay(index)}>
//       <div className="day"><span className='loc'><IoIosArrowForward /> <IoLocationSharp /></span> {day}
//       <span className="date-text">{day}</span>
//       </div>
//     </div>
//     {expandedDay === index && (
//       <ul className="sections-list">
//         {Object.entries.map(([section, sectionIndex]) => (
//           <li key={sectionIndex}>
//             <div className='dayTime'><p >{section}</p></div>
//             {section.places && (
//               <ul className="places-list">
//                 {Object.entries.map(([place, placeIndex]) => (
//                   <li key={placeIndex} className="place-card">
//                     <img src={place.image} alt={place.name} />
//                     <div className="place-details">
//                       <h4>{place ["Place Name"]}</h4>
//                         <div className='type'><p>{place ["Activity Type"]}</p></div>  
//                       <p className='timing'>Opening Hours: {place ["Opening Hours"]}</p>
//                       {/* <p className='visit'>Visit Around : {place.visit}</p> */}
//                       <p className='starRating'><span class="fa fa-star checked"> </span> {place["Rating"]}</p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
             
            
//           </li>
//         ))}
//       </ul>
//     )}
//   </li>
// ))}
// {Object.entries(tripPlanData.tripPlan).map(([day, dayData]) => (
    
      
//   <div key={day} className="day"  onClick={() => handleExpandDay(day)}>
//     <h2>{day}</h2>
//     {Object.entries(dayData).map(([time, timeData]) => (
//       <div key={time} className="time">
//         <h3>{time}</h3>
//         <div className="place">
//           <h4>{timeData["Place Name"]}</h4>
//           <p>Rating: {timeData["Rating"]}</p>
//           <p>Activity Type: {timeData["Activity Type"]}</p>
//           <p>Opening Hours: {timeData["Opening Hours"]}</p>
//           <p>Location: {timeData["location"]}</p>
//         </div>
//       </div>
//     ))}
//   </div>
// ))}
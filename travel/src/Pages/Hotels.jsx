import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/navbar'; // Assuming you have a Navbar component
import './HotelsPage.css'; // Import the corresponding CSS file
import Map from '../Components/Map/map';
import { Link } from "react-router-dom";
import axios from 'axios';
// import hotel_a from '../Assets/hotel_a.jpg';
// import hotel_b from '../Assets/hotel_b.jpg';
// import hotel_c from '../Assets/hotel_c.jpg';
// import hotel_d from '../Assets/hotel_d.jpg';
// import hotel_e from '../Assets/hotel_e.jpg';
// import hotel_f from '../Assets/hotel_f.jpg';

const HotelsPage = () => {
  const [hotelsData, setHotelsData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState([28, 78]);
  const [errorFlag, seterrorFlag] = useState(false);
  // const [lat, lng] = selectedLocation.split(',').map(parseFloat);
  useEffect(() => {
    const fetchTripPlan = async () => {
      try {
        const response = await axios.get('http://localhost:5000/hotels');
        console.log('Hotel Data:', response.data);
        setHotelsData(response.data); // Assuming tripPlan is a state variable
      } catch (error) {
        seterrorFlag(true);
        // console.error('Error fetching Hotel Daata:', error);
      }
    };

    fetchTripPlan();
  }, []);
  const handleHotelClick = (location) => {
    setSelectedLocation(location);

  };
  const renderHotel = () => {
    if (!hotelsData) {
      if (errorFlag) {
        window.location.reload();
      }
      return <div className="loadingTripData"><p className='styling'>Please wait! <br /> Loading Hotels for you...</p> <br />
        <div className="loading-spinner1"></div></div>
    }
    return <div className="">
      {Object.entries(hotelsData.Hotels).map(([hotel, index]) => (
        <div className="hotel-box" key={index} onClick={() => handleHotelClick(index["location"])}>
          <img src={index["image"]} alt={index["hotel_name"]} />
          <div className="details">
            <h3 className='heading'>{index["hotel_name"]}</h3>
            <div className="rating">
              <span class="fa fa-star checked"></span> {index["rating"]}
            </div>
            <div className="price"><b>{index["price_range"]} </b> <br /> <h6>For 1 Night Stay</h6> </div>
            <a href={index["hotel_page"]}><button className="view-deal">View Deal</button></a>

          </div>

        </div>
      ))}
    </div>
  }
  // Sample array of hotel details
  // const hotelData = [
  //   {
  //     id: 1,
  //     name: 'Goa Marriott Resort & Spa',
  //     image: hotel_a,
  //     rating: 4.5,
  //     price: 'Rs. 3600',
  //   },
  //   {
  //     id: 2,
  //     name: 'ITC Grand Goa, a Luxury Collection Resort & Spa, Goa',
  //     image: hotel_b,
  //     rating: 4.2,
  //     price: 'Rs. 10000',
  //   },
  //   // Add more hotel data as needed
  //   {
  //     id: 3,
  //     name: 'West Valley Villa, North Goa',
  //     image: hotel_c,
  //     rating: 4.0,
  //     price: 'Rs. 1500',
  //   },
  //   {
  //     id: 4,
  //     name: 'Hyatt Centric Candolim Goa',
  //     image: hotel_d,
  //     rating: 4.7,
  //     price: 'Rs. 3600',
  //   },
  //   // {
  //   //   id: 5,
  //   //   name: 'Hotel E',
  //   //   image: hotel_e,
  //   //   rating: 4.3,
  //   //   price: 'Rs. 3600',
  //   // },
  //   // {
  //   //   id: 6,
  //   //   name: 'Hotel F',
  //   //   image:  hotel_f,
  //   //   rating: 4.8,
  //   //   price: 'Rs. 3600',
  //   // },
  // ];

  //   const MyComponent = ({ condition }) => {
  //     if (condition) {
  //         return <div>This is rendered if condition is true.</div>;
  //     } else {
  //         return <div>This is rendered if condition is false.</div>;
  //     }
  // }

  return (
    <div className="hotels-page">
      <Navbar />

      <div className="selection-bar">

        <button className="transport">Transport</button>
        <button className="hotelSelected">Hotels</button>
        <Link to="/TripPlanner"> <button className="trip-planner">Trip Planner</button></Link>
        <Link to="/FoodPage"><button className="foodbtn">Food</button></Link>
      </div>

      <div className="main-content">
        <div className="hotels-list">
          {renderHotel()}
        </div>
        <div className="map">
          {/* Display of map */}
          <Map selectedLocation={selectedLocation} />
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;
// {hotelData.map((hotel) => (
//   <div className="hotel-box" key={hotel.id}>
//     <img src={hotel.image} alt={hotel.name} />
//     <div className="details">
//       <h3 className='heading'>{hotel.name}</h3>
//       <div className="rating">
//          <span class="fa fa-star checked"></span> {hotel.rating}
//       </div>
//       <div className="price"><b>{hotel.price} </b> <br /> <h6>For 1 Night Stay</h6> </div>
//       <button className="view-deal">View Deal</button>

//     </div>

//   </div>
// ))}
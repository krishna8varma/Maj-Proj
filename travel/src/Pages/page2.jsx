import React from "react";
import Navbar from "../Components/Navbar/navbar";
import './page2.css';
import Footer from "../Components/Footer/footer";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Page2 = () => {
  
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const startingDate = queryParams.get('startingDate');
    const endingDate = queryParams.get('endingDate');
    return (

        <>

            <Navbar />
            <section className="page2">
                
                <div className="home-container2">
                    <div className="background-image"></div>
                    <div className="content2">
                        <div className="title">
                            <h1 className="title">Discover Activities: Find Your Perfect Adventure!</h1>
                            <p className="dates">Start Date: <span className="dates">{startingDate}</span> - End Date: <span className="dates">{endingDate}</span></p>
                        </div>
                    </div>
                    <div className="button-container2">
                        <div className="black-box">
                            <button className="button2">Beach Activities</button>
                            <button className="button2">Water Sports</button>
                            <button className="button2">Boat Cruises</button>
                            <button className="button2">Trekking and Nature Trails</button>
                            <button className="button2">Shopping</button>
                            <button className="button2">Cultural Events and Festivals</button>
                            <button className="button2">Yoga and Wellness Retreats</button>
                            <button className="button2">Explore Portuguese Heritage</button>
                            {/* Add more buttons as needed */}
                        </div>
                        <div >
                    <Link to="/HotelsPage"> <button className="btn2">Next</button></Link>
                    </div>
                    </div>
                    
                </div>
                
     

                <Footer />
            </section>
        </>

    )
}
export default Page2;
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/navbar";
import './page2.css';
import Footer from "../Components/Footer/footer";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from "axios";
const Page2 = () => {
    const [activities, setActivities] = useState(null);
    const [selectedActivities, setSelectedActivities] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/activities'); // Adjust the URL to your backend API endpoint
                setActivities(response.data.activities);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleActivitySelection = (activity) => {
        setSelectedActivities((prevSelectedActivities) => {
            if (prevSelectedActivities.includes(activity)) {
                return prevSelectedActivities.filter((selectedActivity) => selectedActivity !== activity);
            } else {
                return [...prevSelectedActivities, activity];
            }
        });
    };

    const handleSubmit = async () => {
        if(!selectedActivities){
            alert("Please select some of the activities!");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/activities', {
                selected_activities: selectedActivities,
            });
            console.log('Data successfully posted selected_buttons:', response.data);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

  const renderactivities=()=>{
    if (!activities) {
        return  <div className="loading spinner"></div>
    }
    return <div className="">
    {activities.map((activity, index) => (
        <button key={index}
        className={selectedActivities.includes(activity) ? 'button2_selected' : 'button2'}
        onClick={() => handleActivitySelection(activity)} >
            {activity}
        </button>
       
    ))}
     </div>
  }
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
                            <div className="activities-list">
                                {renderactivities()}
                            </div>
                        </div>
                        <div >
                            <Link to="/HotelsPage"> <button className="btn2" onClick={handleSubmit}>Next</button></Link>
                        </div>
                    </div>

                </div>



                
            </section>
            <Footer />
        </>

    )
}
export default Page2;
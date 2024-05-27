import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar/navbar";
import img1 from '../Assets/solo.png';
import img2 from '../Assets/couple.png';
import img3 from '../Assets/family.png';
import img4 from '../Assets/friends.png';
import Footer from "../Components/Footer/footer";
import './page1.css';
// import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Page1 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // const startingLocation = queryParams.get('startingLocation');
    // const endingDestination = queryParams.get('endingDestination');
    const startingDate = queryParams.get('startingDate');
    const endingDate = queryParams.get('endingDate');
    // const [submitted, setSubmitted] = useState(false);
    const [tripType, setSelectedOption] = useState("");
  

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };


    const handleCompanySubmit = async () => {

        // if (!selectedOption && !submitted) {
        //     alert("Please select an option.");
        //     setSubmitted(true);
        //     return;
        // }
        
        
        const companyFormData = {
            tripType, 
         
        };
        if(!companyFormData.tripType){
            alert("Please select who you are travelling with!");
            return;
        }
        const response = await axios.post("http://localhost:5000/tripType", companyFormData);
        try {
            if (response.status === 200) {
                console.log("Data successfully posted tripType to the server!");
                // Navigate to the next page after successful post
                const url = `/Page2?&startingDate=${startingDate}&endingDate=${endingDate}`;
              navigate(url);
            } else {
                console.error("Failed to post data to the server.");
            }
        } catch (error) {
            console.error("Error:", error);
        };
       
    };

    return (
        <section className="page1">
            <div>
                <Navbar />
            </div>


            <div className="home-container">
                <div className="background-image"></div>
                <div className="content">
                    <h1>Who are you travelling with?</h1>
                    <p>Start Date: <span className="dates">{startingDate}</span> - End Date: <span className="dates">{endingDate} </span></p>
                    <form onSubmit={handleCompanySubmit}></form>
                    <div className="button-container">
                        <div className="icon" onClick={() => handleOptionSelect("Solo")}>
                            <button className="but"><img src={img1} alt="Button 1" /> <p>Wandering solo</p></button>
                        </div>
                        <div className="icon" onClick={() => handleOptionSelect("Couple")}>
                        <button className="but"><img src={img2} alt="Button 2"  /><p>Holidaying as a couple</p></button>
                        </div>
                        <div className="icon" onClick={() => handleOptionSelect("Family")}>
                        <button className="but"> <img src={img3} alt="Button 3"  /><p>Vacationing with family</p></button>
                        </div>
                        <div className="icon" onClick={() => handleOptionSelect("Friends")}>
                        <button className="but"> <img src={img4} alt="Button 4"  /><p>Traveling with friends</p></button>
                        </div>
                    </div>
                   <button className="btnpagg1" onClick={handleCompanySubmit}>Next</button>
                </div>
                
            </div>





            
        </section >
    );
};

export default Page1;
import React from "react";
import Navbar from "../Components/Navbar/navbar";
import img1 from '../Assets/solo.png';
import img2 from '../Assets/couple.png';
import img3 from '../Assets/family.png';
import img4 from '../Assets/friends.png';
import Footer from "../Components/Footer/footer";
import './page1.css';
const Page1 = () => {
    return (
        <section className="page1">
            <div>
                <Navbar />
            </div>


            <div className="home-container">
                <div className="background-image"></div>
                <div className="content">
                    <h1>Who are you travelling with?</h1>
                    <p>Start Date: 06 Arp 2024 - End Date: 10 Arp 2024</p>
                    <div className="button-container">
                        <div className="icon">
                            <button><img src={img1} alt="Button 1" /> <p>Wondering solo</p></button>
                        </div>
                        <div className="icon">
                        <button><img src={img2} alt="Button 2"  /><p>Holidaying as a couple</p></button>
                        </div>
                        <div className="icon">
                        <button> <img src={img3} alt="Button 3" /><p>Vacationing with family</p></button>
                        </div>
                        <div className="icon">
                        <button> <img src={img4} alt="Button 4" /><p>Traveling with friends</p></button>
                        </div>
                    </div>
                    <button className="btn">NEXT</button>
                </div>
                
            </div>





            <Footer />
        </section >
    );
};

export default Page1;
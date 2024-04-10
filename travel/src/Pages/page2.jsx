import React from "react";
import Navbar from "../Components/Navbar/navbar";
import './page2.css';
import Footer from "../Components/Footer/footer";
import { Link } from "react-router-dom";
const Page2 = () => {
    return (

        <>

            <Navbar />
            <section className="page2">

                <div className="home-container2">
                    <div className="background-image"></div>
                    <div className="content2">
                        <div className="title">
                            <h1>Discover Activities: Find Your Perfect Adventure!</h1>
                            <p>Start Date: 06 Arp 2024 - End Date: 10 Arp 2024</p>
                        </div>
                    </div>
                    <div className="button-container2">
                        <div className="black-box">
                            <button className="button2">Button 1</button>
                            <button className="button2">Button 2</button>
                            <button className="button2">Button 3</button>
                            <button className="button2">Button 4</button>
                            <button className="button2">Button 1</button>
                            <button className="button2">Button 2</button>
                            <button className="button2">Button 3</button>
                            <button className="button2">Button 4</button>
                            {/* Add more buttons as needed */}
                        </div>
                        <div className="btn2">
                    <Link to="/Page3"> <button className="btn2">NEXT</button></Link>
                    </div>
                    </div>
                    
                </div>
                
     

                <Footer />
            </section>
        </>

    )
}
export default Page2;
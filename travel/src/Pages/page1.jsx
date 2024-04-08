import React from "react";
import Navbar from "../Components/Navbar/navbar";
import img from "../Assets/Page1bg.jpg";
import Footer from "../Components/Footer/footer"
import './page1.css'
const Page1 = () => {
    return (
        <section className="page1"> 
        <div>
           <Navbar/>
        </div>
       
        <div className="content">

        <img src={img} alt="ocean" />
        <h1>Who are you travelling with?</h1>
        </div>


        <Footer/>
        </section>
    );
};
 
export default Page1;
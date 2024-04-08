import React from "react";
import Navbar from "../Components/Navbar/navbar";
import img from "../Assets/Pag1bg.jpg"
const Page1 = () => {
    return (
        <section className="page1"> 
        <div>
           <Navbar/>
        </div>
       
        <div className="content">

        <img src={img} alt="ocean" />
        </div>
        </section>
    );
};
 
export default Page1;
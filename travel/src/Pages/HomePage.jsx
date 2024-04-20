import React from 'react';
import '../app.css';



import Home from '../Components/Home/home';
import Main from '../Components/Main/main';
import Reviews from '../Components/Reviews/review';
import Navbar from '../Components/Navbar/navbar';
import Footer from '../Components/Footer/footer';
const HomePage =()=>{
    return(
        <>
         
        <Navbar/>
        <Home/>
        <Main/>
        <Reviews/>
        <div className='footer'>
        <Footer/>
        </div>
        </>
    )
}
export default HomePage;
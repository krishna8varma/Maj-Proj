import React from 'react';
import './app.css'
import Home from './Components/Home/home';
import Main from './Components/Main/main';
import Reviews from './Components/Reviews/review';
import Navbar from './Components/Navbar/navbar';
import Footer from './Components/Footer/footer';
const App =()=>{
    return(
        <>
        <Navbar/>
        <Home/>
        <Main/>
        <Reviews/>
        <Footer/>
        </>
       
    )
}
export default App
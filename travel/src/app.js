import React from 'react';
import './app.css'
import Home from './Components/Home/home';
import Main from './Components/Main/main';
import Reviews from './Components/Reviews/review';
import Navbar from './Components/Navbar/navbar'
const App =()=>{
    return(
        <>
        <Navbar/>
        <Home/>
        <Main/>
        <Reviews/>
        </>
       
    )
}
export default App
import React from 'react';
<<<<<<< Updated upstream
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
=======
import './app.css';
import Page2 from "./Pages/page2";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Page1 from './Pages/page1';
import HomePage from './Pages/HomePage';
const App =()=>{
    return(
        <>
         
       <Router>
           
           <Routes>
               <Route exact path="/" element={<HomePage />} />
               <Route path="/Page1" element={<Page1 />} />
               <Route path="/Page2" element={<Page2 />} />
                
              
           </Routes>
       </Router>
>>>>>>> Stashed changes
       
    )
}
export default App
import React from 'react';
import './app.css';

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
              
              
           </Routes>
       </Router>
       
       </>
    )
}


export default App
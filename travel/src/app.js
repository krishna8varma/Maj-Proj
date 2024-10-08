import React from 'react';
import './app.css';

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Page1 from './Pages/page1';
import Page2 from './Pages/page2';
import HomePage from './Pages/HomePage';
import HotelsPage from './Pages/Hotels';
import TripPlanner from './Pages/TripPlanner';
import FoodPage from './Pages/FoodPage';
import ManaliPage from './Pages/ManaliPage';
import GoaPage from './Pages/GoaPage';
import VaranasiPage from './Pages/VaranasiPage';
import Explore from './Pages/explore'
import TransportPage from './Pages/TransportPage';
const App =()=>{
   
    return(
        <>
         
       <Router>
           
           <Routes>
               <Route exact path="/" element={<HomePage />} />
               <Route path="/Page1" element={<Page1 />} />
               <Route path="/Page2" element={<Page2 />} />
               <Route path="/HotelsPage" element={<HotelsPage />} />
               <Route path="/TripPlanner" element={<TripPlanner />} />
               <Route path="/FoodPage" element={<FoodPage />} />
               <Route path="/ManaliPage" element={<ManaliPage />} />
               <Route path="/GoaPage" element={<GoaPage />} />
               <Route path="/VaranasiPage" element={<VaranasiPage />} />
               <Route path="/explore" element={<Explore />} />
               <Route path="/TransportPage" element={<TransportPage/>}/>
           </Routes>
       </Router>
       
       </>
    )
}


export default App
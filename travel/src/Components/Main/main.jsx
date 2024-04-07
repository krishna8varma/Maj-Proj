import React from "react";
import './main.css';
import { HiOutlineLocationMarker } from "react-icons/hi";

import Main1 from '../../Assets/Main1.jpg';
import manali from '../../Assets/manali.jpg';
import goa from '../../Assets/goa.jpg';
import paris from '../../Assets/paris.jpg';
const Data=[{
    id:1,
    imgSrc:manali,
    destTitle: 'Manali',
    Location:"India",
    description:'Manali is a town, near Kullu town in Kullu district in the Indian state of Himachal Pradesh.[2] It is situated in the northern end of the Kullu Valley, formed by the Beas River. ',

},
{
    id:2,
    imgSrc:goa,
    destTitle: 'Goa',
    Location:"India",
    description:'Goa, state of India, comprising a mainland district on the country’s southwestern coast and an offshore island. It is located about 250 miles (400 km) south of Mumbai (Bombay). ',


},
{
    id:3,
    imgSrc:paris,
    destTitle: 'Paris',
    Location:"France",
    description:'Paris, capital of France, is one of the most important and influential cities in the world. In terms of tourism, Paris is the second most visited city in Europe after London. ',

}

]
const Main=() =>{
    return(
        <section className="main container section">
            <div className="iconss">
                <img src={Main1} alt="" />
            </div>
            <div className="secTitle">
                <h3 className="title">You're always a short detour from an</h3>
                <h2 className="underline">Extraordinary Place</h2>
            </div>

            <div className="seeContent grid">
               {
                Data.map(({id,imgSrc,destTitle,description,Location})=>{
                    return(
                        <div key={id} className="singleDestination">
                             <div className="imageDiv">
                                <img src={imgSrc} alt={destTitle} />
                             </div>
                             <div className="cardInfo">
                                <h4 className="destTitle">{destTitle}</h4>
                                <span className="continent flex">
                                    <HiOutlineLocationMarker className="icon"/>
                                    <span className="name">
                                    {Location}
                                </span>
                                </span>
                                <div className="desc">
                                    <p>{description}</p>

                                </div>
                                <button >
                                    Start Trip
                                </button>
                                
                             </div>
                        </div>
                    )
                })
               }
                </div> 
        </section>
    )
}
 export default Main;
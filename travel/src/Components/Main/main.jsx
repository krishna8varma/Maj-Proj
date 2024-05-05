import React from "react";
import './main.css';
// import { HiOutlineLocationMarker } from "react-icons/hi";

// import Main1 from '../../Assets/Main1.jpg';
import manali from '../../Assets/manali.jpg';
import goa from '../../Assets/goa.jpg';
import varanasi from '../../Assets/varanasi.jpg';
import img1 from '../../Assets/adventure.png';
import img2 from '../../Assets/flight.png';
import img3 from '../../Assets/tourguide.png';
import img4 from '../../Assets/beach.png';
import { Link } from "react-router-dom";

const Data = [{
    id: 1,
    imgSrc: manali,
    destTitle: 'Manali',
    link : '/ManaliPage'
},
{
    id: 2,
    imgSrc: goa,
    destTitle: 'Goa',
    link : '/GoaPage'

},
{
    id: 3,
    imgSrc: varanasi,
    destTitle: 'Varanasi',
    link : '/VaranasiPage'
}
]
const list = ({ Data }) => {
    const handleClick = () => {
      // Programmatically navigate to the page associated with the item
      window.location.href = Data.link;
    };
  
    return (
      <button onClick={handleClick}>{Data.link}</button>
    );
  };


const Main = () => {
    
    return (
        <section className="main container section">
            <div  className="division">





                <div class="row">
                    <div class="column">
                        <img src={img2} alt="" />
                    </div>
                    <div class="column">
                        <img src={img3} alt="" />
                    </div>
                    <div class="column">
                        <img src={img4} alt="" />
                    </div>
                    <div class="column">
                        <img src={img1} alt="" />
                    </div>
                </div>



            </div>
            {/* <div className="iconss">
                <img src={Main1} alt="" />
            </div> */}
            <div className="secTitle">
                <h3 className="title">You're always a short detour from an</h3>
                <h2 className="line2">Extraordinary Place</h2>
                <hr className="line1"/>
            </div>

            <div className="seeContent grid">
                {
                    Data.map(({ id, imgSrc, destTitle,link }) => {
                        return (
                        <div className="cards">
                            <div key={id} className="singleDestination">
                                <div className="imageDiv">
                                    <img src={imgSrc} alt={destTitle} />
                                </div>
                                <div className="cardInfo">
                                    <h4 className="destTitle">{destTitle}</h4>
                                    <Link to={link}>
                                    <button className="cardbutton"> Start Trip </button>
                                    </Link>
                                </div>
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
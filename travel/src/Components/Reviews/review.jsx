import React from "react";
import './review.css';
import img1 from '../../Assets/adi.png';
import img2 from '../../Assets/shradha.png';
import img3 from '../../Assets/ramesh.png';
import img4 from '../../Assets/greta.png';
import Reviewcard from '../../Assets/Reviewcard.png';

const Data = [{
    id: 1,
    imgSrc: img1,
    destTitle: 'Aditya Kapoor',
    Rating: 4.5,
    description: "This trip planner is a game-changer! Its user-friendly, customizable, and offers personalized recommendations that helped me create the perfect itinerar"

},
{
    id: 2,
   imgSrc:img2,
    destTitle: 'Shraddha Solanki',
    Rating: 4.7,
    description: 'I consider myself a seasoned traveler, but even I can get overwhelmed with planning sometimes. This website took all the stress out of the equation and allowed me to focus on the excitement of my upcoming trip. I have already recommended it to all my friends! ',


},
{
    id: 3,
    imgSrc:img3,
    destTitle: 'Ramesh Sharma',
    Rating: 5.0,
    description: "I used this trip planner for my recent vacation, and I couldn't be happier with the experience! It made organizing my itinerary a breeze, and the suggestions for activities and accommodations were spot on. Highly recommended!",

},
{
    id: 4,
   imgSrc:img4,
    destTitle: 'Greta Williams',
    Rating: 4.7,
    description: "I've tried several trip planning tools, but none match the convenience and flexibility of this website. It made organizing my vacation a breeze!"

}]
const Review = () => {
    return (
        <section className="Reviews">
            <div className="reviewHead">
                <h3 className="reviewTitle">Reviews and Testimonials</h3>
                <p className="reviewDesc">“Read some of our latest testimonials from people about their trip experience with us.”</p>
                <hr className="lin" />
            </div>
            <div className="seeContentR grid">
                {
                    Data.map(({ id, imgSrc, destTitle, description, Rating }) => {
                        return (
                            <div key={id} className="singleDestination">
                                {/* <div className="imageDiv">
                                <img src={imgSrc} alt={destTitle} />
                             </div> */}
                                <div className="cardInfo">
                                    <div className="userImg">
                                    <h4 className="destTitle"><img src={imgSrc} alt="#"/> {destTitle}</h4>
                                    </div>

                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <div className="desc">
                                            <p>{description}</p>

                                        </div>


                                </div>
                               
                            </div>
                            
                        )
                    })
                }
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSflAl9fiuveFHk1q2f3e7xrCO75HLcTmkaXlFGQbD76HvVAqA/viewform?usp=sf_link">   <div className="rcard">
                    <img src={Reviewcard} muted autoPlay loop type="Reviewcard/jpg" alt="Ratings"></img>

                </div></a> 
            </div>
          <button className="ReviewForm">Leave a Review</button>
        </section>
    )
}


export default Review;
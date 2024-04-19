import React from "react";
import './footer.css';
import { AiOutlineInstagram } from "react-icons/ai";
import { FiFacebook } from "react-icons/fi";


import { BsTwitterX } from "react-icons/bs";

const footer=()=> {
    return (
        <div className="Footer">
            <div className="footerinfo a">
            <p className="logoname">LOGO</p>
            </div>
            <div className="footerinfo b">
            <p className="info">@2024 All rights reserved.</p>
            </div>
            <div className="footerinfo">
            <div className="footerIcons c">
                <div className="rightIcons">
                <FiFacebook className="icon"/>
                <AiOutlineInstagram className="icon"/>
               
                <BsTwitterX className="icon"/>
                </div>
                </div>
            </div>
        </div>
    )
}
    export default footer;
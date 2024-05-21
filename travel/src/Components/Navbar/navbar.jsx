import React,{useState} from 'react'
import './navbar.css'
import {MdOutlineTravelExplore} from 'react-icons/md'
import {IoCloseCircle} from 'react-icons/io5'
import { TbGridDots } from "react-icons/tb";



const Navbar = () => {

   

    const [active, setActive] = useState('navBar')
    //function to toggle navbar
    const showNav = () =>{
        setActive('navBar activeNavbar')
    }

//function to remove navbar
const removeNavbar = () =>{
     setActive('navBar')
}

    return (
       <section className='navBarSection'>
    <header className='header flex'>
        <div className='logoDiv'>
            <a href="/" className='logo flex'>
            <h1> <MdOutlineTravelExplore className="icon"/> Travel</h1>
            </a>
        </div>
       

      <div className={active}>

      <div onClick={removeNavbar} className='closeNavBar'>
        <IoCloseCircle className='icon'/>
       </div>
        <ul className='navLists flex'>
        
        <li className='navItem'>
            <a href="/" className='navLink'>Home</a>
        </li>
        
        
       
        
          <a href="/explore"> <button className='btnnav'>
          Explore
         </button></a> 
       
        </ul>
       

      </div>
  
      <div onClick={showNav} 
      className="toggleNavBar">
      <TbGridDots className = "icon"/>
      </div>

    </header>
       </section>
                
             )
        }
        
 export default Navbar
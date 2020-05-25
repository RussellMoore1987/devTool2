import React from 'react'
import { NavLink } from 'react-router-dom'
// CSS
import './Header.css';
// components
import MenuIcon from "../../../IconAnimations/MenuIcon/MenuIcon.jsx";
import FullScreenIcon from "../../../IconAnimations/FullScreenIcon/FullScreenIcon.jsx";
import Lightbulb from "../../../IconAnimations/Lightbulb/Lightbulb.jsx";


export default function Header(props) {
  return (
    <header className="header">
      <div className="header_logo_container">
        <NavLink to={'/Database'} key={'/Database'}>
          <img src={props.logo} className="header_logo" alt="Core Integration DevTool Logo"/>
        </NavLink>
      </div>
      <div className="header_left_container">
        <MenuIcon click={props.menuClick}/>
      </div>
      <div className="header_right_container">
          <Lightbulb click={props.click}/>
        <div>
          <FullScreenIcon />
        </div>
      </div>
    </header>
  )
}

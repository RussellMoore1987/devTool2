import React from 'react'
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
        <img src={props.logo} className="header_logo" alt="Core Integration DevTool Logo"/>
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

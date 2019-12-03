import React from 'react'
// CSS
import './Header.css';
// assets
import logo from "../../../../assets/images/lightLogo.png";
import menu from "../../../../assets/images/menu.png";
import sizeIcon from "../../../../assets/images/full_screen.png";
import light from "../../../../assets/images/light_lightbulb.png";

export default function Header() {
  return (
    <header className="header">
      <div className="header_left_container">
        <img src={menu} className="header_menu" alt="menu"/>
      </div>
      <div className="header_logo_container">
        <img src={logo} className="header_logo" alt="Core Integration DevTool Logo"/>
      </div>
      <div className="header_right_container">
        <div className="header_lightBulb_toggle">
          <div>
            <img src={light} className="header_light" alt="light of lightbulb"/>
            <i className="far fa-lightbulb"></i>
          </div>
        </div>
        <div>
          <img src={sizeIcon} className="header_sizeIcon" alt="sizeIcon"/>
        </div>
      </div>
    </header>
  )
}

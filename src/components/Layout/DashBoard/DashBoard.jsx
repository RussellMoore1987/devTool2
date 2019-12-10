import React, { Component } from 'react'
// components
import Header from "./Header/Header.jsx";
import SideBar from "./SideBar/SideBar.jsx";
import PageTransitions from "./PageTransitions/PageTransitions.jsx";
import MainPanel from "./MainPanel/MainPanel.jsx";
// CSS
import "./DashBoard.css";
// assets
import darkLogo from "../../../assets/images/darkLogo.png";
import lightLogo from "../../../assets/images/lightLogo.png";

export default class DashBoard extends Component {
  // state 
  // state is a reserved word
  state = {
    lightLogo: true
  }

  // switch logo handling
  switchLogoHandling = () => {
    // switch logo, this function is triggered in the lightbulb component in the header
    this.setState({lightLogo: !this.state.lightLogo})      
  }
  
  render() {

    // set logo
    let logo = darkLogo;  
    if (this.state.lightLogo) {
      logo = lightLogo;  
    } 
    
    // set fade-in animation
    setTimeout(() => {
      document.querySelector(".mainDashBoard").classList.add('panel-fade-in');  
    }, 400);

    return (
      <div className="mainDashBoard">
        <SideBar />
        <Header logo={logo} click={this.switchLogoHandling}/>
        <PageTransitions />
        <MainPanel />
      </div>
    )
  }
}

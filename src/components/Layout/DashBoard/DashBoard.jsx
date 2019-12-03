import React, { Component } from 'react'
// components
import Header from "./Header/Header.jsx";
import SideBar from "./SideBar/SideBar.jsx";
import PageTransitions from "./PageTransitions/PageTransitions.jsx";
import MainPanel from "./MainPanel/MainPanel.jsx";
// CSS
import "./DashBoard.css";

export default class DashBoard extends Component {
  render() {
    // set fade-in animation
    setTimeout(() => {
      document.querySelector(".mainDashBoard").classList.add('panel-fade-in');  
    }, 400);
    return (
      <div className="mainDashBoard">
        <SideBar />
        <Header />
        <PageTransitions />
        <MainPanel />
      </div>
    )
  }
}

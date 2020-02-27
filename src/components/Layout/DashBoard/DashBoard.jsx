// ? couldn't figure out a particular problem with the reloading of the component did some work around code, but probably is not the most efficient way to do it

import React, { Component } from 'react';
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
    lightLogo: true,
    counter: 0
  }

  // to help out with page transitions
  oldPath = ""

  // to help with menu options
  activeSubMenuTrigger = false;
  didMount = false;

  // switch logo handling
  switchLogoHandling = () => {
    // switch logo, this function is triggered in the lightbulb component in the header
    this.setState({lightLogo: !this.state.lightLogo});      
  }

  // helps with showing active menu when menu is open all the way 
  // this triggers a re-render of the sidebar component when the sidebar reloads it will perform the needed actions
  displayActiveSubMenuHandling = () => {
    // check to see what stage we are in the menu setting, switch active menu to the correct one and send it on
    const mainDashBoard = document.querySelector(".mainDashBoard");
    // if we are oon the correct state trigger the remainder and add a class so that other processing can happen
    if (mainDashBoard.classList.contains('menuStage2')) {
      
      const incrementCounter = this.state.counter + 1;
      mainDashBoard.classList.add('activateMenu');
      mainDashBoard.classList.add('gggfff');
      this.setState({activeSubMenu: incrementCounter}); 
      this.activeSubMenuTrigger = true;
    }
  }
  
  componentDidUpdate = () => {
    // ! possibly do page transition on component did update
    // console.log("componentDidUpdate");
  };

  componentDidMount = () => {
    // check to see if we need to re-set the menu
    this.didMount = true;
  };
  
  render() {
    
    let applicationState = " ";
    applicationState += " " + localStorage.getItem('dashBoardMode');
    applicationState += " " + localStorage.getItem('fullScreen');
    if (this.activeSubMenuTrigger) {
      applicationState += " activateMenu";
      applicationState += " menuStage3";
      this.activeSubMenuTrigger = false;
    } else if (!this.didMount && localStorage.getItem('menuStage') === "menuStage3") {
      applicationState += " activateMenu";
      applicationState += " menuStage3";
    } else {
      applicationState += " " + localStorage.getItem('menuStage');
    }
    
    // set logo
    let logo = lightLogo; 
    const darkMode = document.querySelector('.mainDashBoard.darkMode');
    if (darkMode || localStorage.getItem('dashBoardMode') === 'darkMode') {
      logo = darkLogo;  
    } 
    
    if (!document.querySelector(".mainDashBoard")) {
      // set fade-in animation
      setTimeout(() => {
        document.querySelector(".mainDashBoard").classList.add('panel-fade-in');  
      }, 400);
    } else {
      // not exactly sure why but the main dashboard needs this class on all other sets, otherwise it has quirky problems
      applicationState += " panel-fade-in";
    }

    // checking to see whether or not we need to run page transitions
    let pageTransitions = "";  
    if (this.didMount) {
      pageTransitions = <PageTransitions pathInfo={this.props} oldPath={this.oldPath} />;  
    }
    // set path with current path so on the next run around we have it for the oldPath variable
    this.oldPath = this.props.history.location.pathname;
    
    return (
      <div className={"mainDashBoard " + applicationState} >
        <SideBar path={this.props.location.pathname}/>
        <Header logo={logo} click={this.switchLogoHandling} menuClick={this.displayActiveSubMenuHandling}/>
        {pageTransitions}
        <MainPanel />
      </div>
    )
  }
}

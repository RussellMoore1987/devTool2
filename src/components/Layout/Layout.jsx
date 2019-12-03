// packages
import React, { Component } from 'react'
// context
import ShopContext from '../../context/shop-context'
// components
import MainModal from '../MainModal/MainModal.jsx'
import LoginLayout from './LoginLayout/LoginLayout.jsx'
import DashBoard from './DashBoard/DashBoard.jsx'
// CSS
// CSS component indicator: LoginLayout = l_(class or id)
import './Layout.css';
// assets
import formBackgroundImg from "../../assets/images/hot-air-balloon-2411851.jpg";


export default class Layout extends Component {
  // connecting to the context store, main state management
  static contextType = ShopContext; 

  render() {
    // Determine whether or not we are logged in and rendered accordingly
    let layout = null;
    switch (this.context.loggedIn) {
      case true: layout = <DashBoard />; break;
      default: layout = <LoginLayout />; break;
    }

    // Determine whether or not to show modal
    let modal = null;
    if (this.context.useModal) {
      modal = <MainModal />;
    }

    // background image
    const formBackground = {backgroundImage: `url(${formBackgroundImg})`};
    
    /* 
      - These two variables ({modal} and {layout}) are set above
      - If the model is there it will appear
      - The two different layouts are dashboard and log
    */  

    return (
      <div style={formBackground } className="l_mainLayout">
        {modal}
        {layout}  
      </div>
    )
  }
}
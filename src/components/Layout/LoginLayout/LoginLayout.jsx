// packages
import React, { Component } from 'react';
import axios from 'axios';
// context
import ShopContext from '../../../context/shop-context'
// components
import LoginInput from "./LoginInput/LoginInput.jsx";
// CSS 
// CSS component indicator: LoginLayout = ll_(class or id)
import './LoginLayout.css';
// assets
import messageBackgroundImg from "../../../assets/images/hot-air-balloon-2411851.jpg";
import logo2 from "../../../assets/images/logo_no_cogs.png";
import Cogs from "../../IconAnimations/Cogs/Cogs.jsx";
import Checkbox from "../../IconAnimations/Checkbox/Checkbox.jsx";

export default class LoginLayout extends Component {
  // connecting to the context store, main state management
  static contextType = ShopContext; 

  // state 
  // state is a reserved word
  state = {
    error: false,
    errorMessage: "",
    success: false
  }
  
  // @ Goes and validates the login process start
  loginCheckerHandler = (e) => {
    // prevent form submission
    e.preventDefault()
    // get username and password from inputs
    const username = document.querySelector(".ll_username").value;
    const password = document.querySelector(".ll_password").value;
    // construct the instructions for core integration context API
    const instructions_str = {
      login: {
        "type": "devTool",
        "method": "devTool_login",
        "data": {
            // test
            "username": username,
            // Test@the9
            "password": password 
        }
      },
      tables: {
        "type": "devTool",
        "method": "devTool_get_all_tables",
        "data": ""
      }
    };
    // put request in to form data
    const formData = new FormData();
    formData.append('instructions', JSON.stringify(instructions_str));
    // make the call to the core integration context API
    axios.post('http://localhost/open_source_project/public/api/contextApi/v1/', formData)
      .then(response => {
        console.log("contextApi got it", response);
        // check for a good response
        if (response.status === 200) {
          // check for errors
          if (response.data.content.login.statusCode === 200) {
            this.setState({
              error: false,
              success: true
            })
            // trigger login in main state, this makes it switch to the dashboard
            setTimeout(() => {
              this.context.loginHandler();
            }, 3000);
            // set fade-out animation
            setTimeout(() => {
              document.querySelector(".ll_loginContainer").classList.add('panel-fade-out');  
            }, 2000);
          } else {
            // output error messages
            console.log(response.data.content.login.errors);
            this.setState({
              error: true,
              errorMessage: response.data.content.login.errors[0],
              success: false
            })    
          }
        }
        // TODO: add else
      }).catch(error => {
          console.log("contextApi error.response", error.response);
      });
  }
  // @ Goes and validates the login process end

  render() {
    // check for success and error and perform the proper actions
    let successCheck = "";
    let formStatusClass = "";
    let errorMessage = <p className={"ll_errorMessage"}></p>;
    if (this.state.success) {
      successCheck = <Checkbox/>;
      formStatusClass = "ll_success";
    } else if (this.state.error) {
      errorMessage = <p className={"ll_errorMessage"}>{this.state.errorMessage}</p>;
      formStatusClass = "ll_error";
    }

    // ! start here ************************************************************************
    // TODO: possibly speed up my animation
    // TODO: focus at end of text
    // TODO: check to see if it still responsive, the login screen
    // TODO: put Max and min characters on text field
    // TODO: Delay a little bit the text field turning into the password field and vice a versa

    // background image
    const messageBackground = {backgroundImage: `url(${messageBackgroundImg})`};

    // set focus
    if (!this.state.error && !this.state.success) {
      setTimeout(() => {
        document.querySelector(".ll_username").focus();  
      }, 1000);
    }

    // set fade-in animation
    setTimeout(() => {
      document.querySelector(".ll_loginContainer").classList.add('panel-fade-in');  
    }, 400);

    return (
      <div className={"ll_loginContainer"}>
        <div style={messageBackground} className={"ll_loginMessage"}>
          <h1>Imagine It, Plan It, Create It</h1>
          <p>The power to do amazing things is within you. What amazing things will you make today?</p>
        </div>
        <div className={"ll_loginForm"}>
          <form className={formStatusClass}>
            {errorMessage}
            {successCheck}
            <div className={"ll_logoContainer"}>
              <Cogs className={"ll_cogs"} />
              <img className={"ll_loginLogo"} src={logo2} alt=""/>
              <div className={"ll_logoLight"}></div>
            </div>
            <h3 className="ll_title">Login</h3>
            <LoginInput className="ll_username" type="text" label="Username" />
            <LoginInput className="ll_password" type="password" label="Password" />
            <div className={"ll_formBtnContainer"}>
              <button type="submit" className={"ll_formBtn dt-btn"} onClick={this.loginCheckerHandler.bind(this)}>Login</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

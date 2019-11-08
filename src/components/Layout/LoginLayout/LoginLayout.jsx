// packages
import React, { Component } from 'react'
import CSSTransition from "react-transition-group/CSSTransition";
import axios from 'axios';
// components
import LoginInput from "./LoginInput/LoginInput.jsx";
// CSS
import './LoginLayout.animations.css';
import styles from './LoginLayout.module.css';
// assets
import messageBackgroundImg from "../../../assets/images/hot-air-balloon-2411851.jpg";
import logo2 from "../../../assets/images/logo_no_cogs.png";
import Cogs from "../../IconAnimations/Cogs/Cogs.jsx";
import Checkbox from "../../IconAnimations/Checkbox/Checkbox.jsx";

export default class LoginLayout extends Component {

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
    const username = document.querySelector(".username").value;
    const password = document.querySelector(".password").value;
    // construct the instructions for context API
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
    // make the call to context API
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
      }).catch(error => {
          console.log("contextApi error.response", error.response);
      });
  }
  // @ Goes and validates the login process end

  render() {
    // set animation timing
    const loginFade = {
      appear: 1000,
      enter: 1000,
      exit: 1000
    }

    // check for success and error and perform the proper actions
    let successCheck = "";
    let formStatusClass = "";
    let errorMessage = <p className={styles.errorMessage + " login-fade message-fade "}>{this.state.errorMessage}</p>;
    if (this.state.success) {
      successCheck = <Checkbox/>;
      formStatusClass = styles.success;
    } else if (this.state.error) {
      errorMessage = <p className={styles.errorMessage + " message-fade"}>{this.state.errorMessage}</p>;
      formStatusClass = styles.error;
    }

    // ! start here ************************************************************************
    // TODO: possibly speed up my animation
    // TODO: focus at end of text
    // TODO: make cogs start check mark appears
    // TODO: check to see if it still responsive, the login screen
    // TODO: put Max and min characters on text field
    // TODO: Delay a little bit the text field turning into the password field and vice a versa

    // background image
    const messageBackground = {backgroundImage: `url(${messageBackgroundImg})`};

    // set focus
    if (!this.state.error && !this.state.success) {
      setTimeout(() => {
        document.querySelector(".username").focus();  
      }, 1000);
    }

    return (
      <CSSTransition in={true} appear={true} mountOnEnter unmountOnExit classNames={"login-fade"} timeout={loginFade}>
        <div className={styles.loginContainer + " login-fade"}>
          <div style={messageBackground} className={styles.loginMessage}>
            <h1>Imagine It, Plan It, Create It</h1>
            <p>The power to do amazing things is within you. What amazing things will you make today?</p>
          </div>
          <div className={styles.loginForm}>
            <form className={formStatusClass}>
              <CSSTransition in={this.state.error} appear={true} mountOnEnter unmountOnExit classNames={"message-fade"} timeout={loginFade}>
                {errorMessage}
              </CSSTransition> 
              {successCheck}
              <div className={styles.logoContainer}>
                <Cogs className={styles.cogs} />
                <img className={styles.loginLogo} src={logo2} alt=""/>
                <div className={styles.logoLight}></div>
              </div>
              <h3 className="title">Login</h3>
              <LoginInput className="username" type="text" label="Username" />
              <LoginInput className="password" type="password" label="Password" />
              <div className={styles.formBtnContainer}>
                <button type="submit" className={styles.formBtn + " dt-btn"} onClick={this.loginCheckerHandler.bind(this)}>Login</button>
              </div>
            </form>
          </div>
        </div>
      </CSSTransition>
    )
  }
}

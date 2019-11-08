
import React, { Component } from 'react';
import styles from "./LoginInput.module.css";
import "./LoginInput.animation.css";
// import icon
import PasswordIcon from "./PasswordIcon/PasswordIcon.jsx";

export default class LoginInput extends Component {
  
  // Activates input
  inputHandler = (e) => {
    // get the form group, consisting of label and input
    const formGroup = e.target.closest("div");
    // check to see if were on focus or if the text field has things in it
      if (e.type === "focus" || e.target.value.length > 0 || (e.target.value.length === 0 && e.type === "change")) {
        // add focus class to form group to move the label
        formGroup.classList.add("focus");  
      } else {
        formGroup.classList.remove("focus");  
      }
  }

  // when you click on the label it will activate the focus on the form
  labelSelectorHandler = (e) => {
    // get the form group, consisting of label and input
    const formGroup = e.target.closest("div");
    // activate input, set focus
    formGroup.querySelector("input").focus();
  }

  // when you click on the label it will activate the focus on the form
  eyeIconHandler = (e) => {
    // get svg
    const iconContainer = e.target.closest("div");
    const svg = iconContainer.querySelector("svg")
    // switch the eyeball class
    if (!svg.classList.contains('eyeSlash') && !svg.classList.contains('eyeSlashOff')) {
      svg.classList.toggle("eyeSlash")
      setTimeout(function(){
        svg.classList.toggle("eyeSlashHold")
      }, 1000);
    } else {
      if (svg.classList.contains('eyeSlash')) {
        svg.classList.toggle("eyeSlashOff")
        setTimeout(() => {
          svg.classList.toggle("eyeSlash")
          svg.classList.toggle("eyeSlashHold")
          svg.classList.toggle("eyeSlashOff")
        }, 1000);
      }
    }
    // get the form group, consisting of label and input
    const formGroup = e.target.closest("div.formGroup");
    // set the input
    const input = formGroup.querySelector("input");
    // switch input from text to password accordingly
    setTimeout(() => {
      if (input.getAttribute("type") === "text") {
        input.setAttribute("type", "password");
      } else {
        input.setAttribute("type", "text");
      }
    }, 500);
  }
  
  render() {
    // if this.props.type === password, put in eyeball icon
    let eyeIcon = "";
    if (this.props.type === "password") {
      eyeIcon = <PasswordIcon click={this.eyeIconHandler.bind(this)}/>;
    }

    return (
      <div className={styles.formGroup + " formGroup"}>
        <label htmlFor="" onClick={this.labelSelectorHandler.bind(this)}>{this.props.label}</label>
        {eyeIcon}
        <input
          className={this.props.className} 
          type={this.props.type} 
          value={this.props.children} 
          onFocus={this.inputHandler.bind(this)} 
          onBlur={this.inputHandler.bind(this)} 
          onChange={this.inputHandler.bind(this)}/>
      </div>
    )
  }
}
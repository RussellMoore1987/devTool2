
import React, { Component } from 'react';
import styles from "./LoginInput.module.css";
import "./LoginInput.animation.css";

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
    // switch the eyeball class
    e.target.classList.toggle("fa-eye")
    e.target.classList.toggle("fa-eye-slash")
    // get the form group, consisting of label and input
    const formGroup = e.target.closest("div");
    // set the input
    const input = formGroup.querySelector("input");
    // switch input from text to password accordingly
    if (input.getAttribute("type") === "text") {
      input.setAttribute("type", "password");
    } else {
      input.setAttribute("type", "text");
    }
  }

  
  render() {
    // if this.props.type === password, put in eyeball icon
    let eyeIcon = "";
    if (this.props.type === "password") {
      eyeIcon = <i className="far fa-eye" onClick={this.eyeIconHandler.bind(this)}></i>;
    }

    return (
      <div className={styles.formGroup}>
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
import React, { Component } from 'react'
// components, transitions
import BubbleTransition from './BubbleTransition/BubbleTransition.jsx'
// CSS
import './PageTransitions.css';

export default class PageTransitions extends Component {

  didMount = false;

  componentDidMount = () => {
    // set this to true so we can start getting page transitions after it mounts
    this.didMount = true;
  }

  // this particular component should only update when the path is changed
  shouldComponentUpdate = (prevProps) => {
    // console.dir('prevProps path ' +  prevProps.pathInfo.history.location.pathname);
    // console.log('prevProps oldPath ' + prevProps.oldPath);
    // console.log(prevProps.pathInfo.history.location.pathname === prevProps.oldPath ? false : true);
    return prevProps.pathInfo.history.location.pathname === prevProps.oldPath ? false : true;
  }

  render() {
    // ability to turn display/transition back on
    if (document.querySelector('.pageTransition')) {
      document.querySelector('.pageTransition').style.display = 'inline-block';
    }

    // after a set of time turn display to none 
    setTimeout(() => {
      document.querySelector('.pageTransition').style.display = 'none';
    }, 2200);

    // pick transition
    const transitionArray = [<BubbleTransition />];
    let transition = transitionArray[Math.floor(Math.random() * transitionArray.length)];

    // if it has not mounted yet do not run the page transition
    if (!this.didMount) {
      transition = ""; 
    }
    return (
      <div className="pageTransition" >
        {transition}
      </div>
    )
  }
}


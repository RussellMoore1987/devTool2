import React from 'react'
import './MenuIcon.css';

export default function MenuIcon(props) {
  // menu state handler
  const menuStateHandler = () => {
    const dashboard = document.querySelector(".mainDashBoard");
    // check what class it has
    if (dashboard.classList.contains("menuStage2")) {
      dashboard.classList.add("menuStage3"); 
      dashboard.classList.remove("menuStage2");    
      localStorage.setItem('menuStage', 'menuStage3');   
    } else if (dashboard.classList.contains("menuStage3")) {
      dashboard.classList.add("menuStage4");  
      dashboard.classList.remove("menuStage3");
      localStorage.setItem('menuStage', 'menuStage4');   
    } else {
      dashboard.classList.add("menuStage2");
      dashboard.classList.remove("menuStage4");
      localStorage.setItem('menuStage', 'menuStage2');     
    }
  } 

  return (
    <div className="menuIconContainer" onClick={menuStateHandler}>
      <div onClick={props.click}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.03 24.6" className="menuIcon">
          <title>Menu Icon</title>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <line className="cls-1 smallBar" x1="1" y1="5.2" x2="25" y2="5.2"/>
              <line className="cls-1 smallBar" x1="1" y1="11.93" x2="25" y2="11.93"/>
              <line className="cls-1 smallBar" x1="1" y1="18.93" x2="25" y2="18.93"/>
              <path className="cls-1 path" d="M1,5.2H25s6,.25,7-3.75-22,6-31,10"/>
              <path className="cls-1 path" d="M1,18.93H25s6-.25,7,3.75-22-6-31-10"/>
              <line className="cls-1 main" x1="1" y1="11.93" x2="25" y2="11.93"/>
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}

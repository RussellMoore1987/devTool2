import React from 'react'
import './Lightbulb.css';

export default function Lightbulb(props) {
  // light and dark mode handler
  const lightAndDarkModeHandler = () => {
    const dashboard = document.querySelector(".mainDashBoard");
    // check what class it has
    if (dashboard.classList.contains("darkMode")) {
      dashboard.classList.add("lightMode");    
      dashboard.classList.remove("darkMode");   
    } else {
      dashboard.classList.add("darkMode");
      dashboard.classList.remove("lightMode");    
    }
    props.click()
  } 
  return (
    <div className="header_lightBulb_toggle" onClick={lightAndDarkModeHandler}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59.27 53.2" className="lightbulbIcon">
          <title>Lightbulb</title>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              {/* Lightbulb */}
              <path className="cls-1" d="M25.09,12.42a12,12,0,0,1,10.74,5.29A11.5,11.5,0,0,1,37,27.45c-.81,2.34-2.34,4.34-3.63,6.44s-2.39,4.5-2.15,7-2.58,1.41-4.6,1.39H24.93c-2,0-4.83,1-4.59-1.39s-.86-4.85-2.15-7-2.83-4.1-3.63-6.44a11.5,11.5,0,0,1,1.15-9.74,12,12,0,0,1,10.74-5.29" />
              {/* lines beneath lightbulb */}
              <line className="cls-2" x1="23.5" y1="52.2" x2="28.05" y2="52.2" />
              <line className="cls-2" x1="20.46" y1="49.67" x2="31.08" y2="49.67" />
              <line className="cls-2" x1="20.46" y1="46.64" x2="31.08" y2="46.64" />
              <line className="cls-2" x1="20.46" y1="44.11" x2="31.08" y2="44.11" />
              {/* Lightbulb outline */}
              <path className="cls-3" d="M25.09,12.26a12,12,0,0,1,10.74,5.3A11.49,11.49,0,0,1,37,27.3c-.81,2.34-2.34,4.33-3.63,6.44S31,38.23,31.21,40.69s-2.58,1.41-4.6,1.4H24.93c-2,0-4.83,1-4.59-1.4s-.86-4.85-2.15-6.95-2.83-4.1-3.63-6.44a11.49,11.49,0,0,1,1.15-9.74,12,12,0,0,1,10.74-5.3" />
              {/* lightbulb inner curve */}
              <path className="cls-4" d="M19.52,23.24s1-7,7-6" />  
            </g>
          </g>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.5 12.06" className="lightbulbIconFragments-polygon p1">
          <g id="Layer_2" data-name="Layer 2">
            <polygon className="cls-1" points="9.54 11.54 3.37 11.21 0.58 5.69 3.96 0.52 10.13 0.85 12.92 6.37 9.54 11.54"/>
          </g>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.5 12.06" className="lightbulbIconFragments-polygon p2">
          <g id="Layer_2" data-name="Layer 2">
            <polygon className="cls-1" points="9.54 11.54 3.37 11.21 0.58 5.69 3.96 0.52 10.13 0.85 12.92 6.37 9.54 11.54"/>
          </g>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.28 9.31" className="lightbulbIconFragments-triangle t1">
          <g id="Layer_2" data-name="Layer 2">
            <polygon className="cls-1" points="7.38 8.42 1 4.33 7.74 0.84 7.38 8.42"/>
          </g>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.28 9.31" className="lightbulbIconFragments-triangle t2">
          <g id="Layer_2" data-name="Layer 2">
            <polygon className="cls-1" points="7.38 8.42 1 4.33 7.74 0.84 7.38 8.42"/>
          </g>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.28 9.31" className="lightbulbIconFragments-triangle t3">
          <g id="Layer_2" data-name="Layer 2">
            <polygon className="cls-1" points="7.38 8.42 1 4.33 7.74 0.84 7.38 8.42"/>
          </g>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.28 9.31" className="lightbulbIconFragments-triangle t4">
          <g id="Layer_2" data-name="Layer 2">
            <polygon className="cls-1" points="7.38 8.42 1 4.33 7.74 0.84 7.38 8.42"/>
          </g>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.28 9.31" className="lightbulbIconFragments-triangle t5">
          <g id="Layer_2" data-name="Layer 2">
            <polygon className="cls-1" points="7.38 8.42 1 4.33 7.74 0.84 7.38 8.42"/>
          </g>
        </svg>
      </div>
    </div>
  )
}

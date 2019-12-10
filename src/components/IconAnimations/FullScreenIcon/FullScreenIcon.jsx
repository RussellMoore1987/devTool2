import React from 'react'
import './FullScreenIcon.css';

export default function FullScreenIcon() {
  // menu state handler
  const fullScreenHandler = () => {
    const dashboard = document.querySelector(".mainDashBoard");
    // toggle class on and off
    dashboard.classList.toggle("fullWidth")
  } 
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.01 28.01" className="fullScreenIcon" onClick={fullScreenHandler}>
        <title>Full Screen Icon</title>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <rect className="cls-1" x="4" y="4.01"/>
            <polyline className="cls-2 cls-3" points="1.08 13.35 1.01 1.19 26.94 1.01 27.01 11.65 16.36 11.71 16.3 1.07"/>
            <polyline className="cls-2 cls-4" points="14.66 1.08 26.82 1.01 27.01 26.94 16.36 27.01 16.3 16.36 26.94 16.3"/>
            <polyline className="cls-2 cls-5" points="26.93 14.66 27.01 26.82 1.07 27.01 1.01 16.36 11.65 16.3 11.71 26.94"/>
            <polyline className="cls-2 cls-6" points="13.35 26.93 1.19 27.01 1.01 1.07 11.65 1.01 11.71 11.65 1.07 11.71"/>
          </g>
        </g>
      </svg>
    </div>
  )
}

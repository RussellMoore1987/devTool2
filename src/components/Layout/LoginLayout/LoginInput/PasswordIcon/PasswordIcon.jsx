import React from 'react'
import styles from './PasswordIcon.module.css'
import './PasswordIcon.animation.css'

export default function PasswordIcon(props) {
  return (
    <div className={styles.container}>
      <i className="far fa-eye" onClick={props.click}></i>
        <svg className={styles.svg} onClick={props.click} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.14 46.15">
          <title>Asset 4</title>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_3" data-name="Layer 3">
              <line className={styles.cls1 + " cls1"} x1="8.5" y1="7.78" x2="37.77" y2="39.32" />
              <path className={styles.cls2 + " cls2"} d="M44.64,23.07a21.57,21.57,0,0,0-43.14,0c0,12.74,11.31,21.39,21.57,21.57,7.45.13,12.85-4.22,14.63-5.8L9.52,8.47" />
            </g>
          </g>
        </svg>
      </div>
  )
}



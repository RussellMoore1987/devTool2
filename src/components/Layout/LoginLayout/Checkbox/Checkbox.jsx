import React from 'react'
import styles from './Checkbox.module.css'

export default function Checkbox(props) {
    return (
        <div className={props.className}>
            <svg className={styles.svg + " "  + styles.svgGo} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 146.3 146.3">
                <title>checkbox</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_3" data-name="Layer 3">
                        <polyline className={styles.cls1} points="38.38 77.84 59.85 98.34 107.93 47.96"/>
                        <circle className={styles.cls2} cx="73.15" cy="73.15" r="64.65"/>
                        <circle className={styles.cls3} cx="73.15" cy="73.15" r="64.65"/>
                        <circle className={styles.cls4} cx="73.15" cy="73.15" r="64.65"/>
                    </g>
                </g>
            </svg>
        </div>
    )
}

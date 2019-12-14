import React from 'react'

export default function DocumentationIcon(props) {
  // check to see whether or not the icon is active
  const fill = props.active ? "url(#documentationIcon-gradient)" : "";
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="22.245" height="31.285" viewBox="0 0 22.245 31.285" className="documentationIcon">
        <defs>
          <linearGradient id="documentationIcon-gradient" y1="0.5" x2="1" y2="0.5" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#f36a10" />
            <stop offset="0.168" stopColor="#f4720e" />
            <stop offset="0.441" stopColor="#f68b0a" />
            <stop offset="0.784" stopColor="#fbb204" />
            <stop offset="1" stopColor="#ffcf00" />
          </linearGradient>
        </defs>
        <g id="Group_618" data-name="Group 618" transform="translate(-19.005 -335.919)">
          <g id="Group_563" data-name="Group 563" transform="translate(19.005 335.919)">
            <path id="Path_190" data-name="Path 190" d="M2736.536-2239.71h-8.308a3.855,3.855,0,0,1-3.85-3.85v-23.585a3.854,3.854,0,0,1,3.85-3.85h14.545a3.855,3.855,0,0,1,3.85,3.85v17.123a3.834,3.834,0,0,1-1.08,2.674l-6.237,6.463A3.873,3.873,0,0,1,2736.536-2239.71Zm-8.308-29.9a2.472,2.472,0,0,0-2.469,2.469v23.585a2.472,2.472,0,0,0,2.469,2.469h8.308a2.482,2.482,0,0,0,1.777-.754l6.237-6.462a2.457,2.457,0,0,0,.692-1.714v-17.123a2.472,2.472,0,0,0-2.469-2.469Z" transform="translate(-2724.378 2270.995)" fill={fill} />
            <path id="Path_191" data-name="Path 191" d="M2782.044-2171.708h-1.381v-5.206a1.855,1.855,0,0,1,1.853-1.853h4.451v1.381h-4.451a.472.472,0,0,0-.472.472Z" transform="translate(-2767.707 2199.997)" fill={fill} />
            <rect id="Rectangle_1538" data-name="Rectangle 1538" width="13.506" height="1.381" transform="translate(4.329 7.515)" fill={fill} />
            <rect id="Rectangle_1539" data-name="Rectangle 1539" width="13.506" height="1.381" transform="translate(4.329 10.41)" fill={fill} />
            <rect id="Rectangle_1540" data-name="Rectangle 1540" width="13.506" height="1.381" transform="translate(4.329 13.304)" fill={fill} />
            <rect id="Rectangle_1541" data-name="Rectangle 1541" width="9.074" height="1.381" transform="translate(4.329 15.935)" fill={fill} />
          </g>
        </g>
      </svg>
    </div>
  )
}

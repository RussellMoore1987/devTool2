import React from 'react';
// css
import './MenuItem.css';
// component/SVG icons
import DbIcon from './MenuIcons/DbIcon.jsx';
import DocumentationIcon from './MenuIcons/DocumentationIcon.jsx';
import SettingIcon from './MenuIcons/SettingIcon.jsx';

export default function MenuItem(props) {    
    // setting default icon
    let icon = DbIcon;
    // get Icon
    switch (props.icon) {
        case 'dbIcon': icon = <DbIcon active={props.active} />; break;
        case 'settingIcon': icon = <SettingIcon active={props.active} />; break;
        case 'documentationIcon': icon = <DocumentationIcon active={props.active} />; break;
        default: break;
    }

    // for className
    const propClassName = props.active ? "active" : "";

    return (
        <div 
        className={"menuItem " + propClassName} 
        data-type={props.icon} 
        onClick={props.click}
        onMouseOver={props.hover}>
          {icon}
          <span className={propClassName}>{props.name}</span>
        </div>
    )
}

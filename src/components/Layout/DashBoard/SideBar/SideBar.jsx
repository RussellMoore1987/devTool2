import React from 'react'
// component
import MenuItem from './MenuItem/MenuItem.jsx';
// CSS
import './SideBar.css';

// create menu
const menu = {
  Database: {
    DashBard:4
  }
};

export default function SideBar() {
  return (
    <div>
      <div className="sideBar">
        <div className="activeBar"></div>
        <MenuItem icon="dbIcon" active={true} name="Database" />
        <MenuItem icon="settingIcon" name="Settings" />
        <MenuItem icon="documentationIcon" name="Docs" />
      </div>
      <div className="subSideBar">

      </div>
    </div>
  )
}

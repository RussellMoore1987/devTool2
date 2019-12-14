import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
// component
import MenuItem from './MenuItem/MenuItem.jsx';
// CSS
import './SideBar.css';

export default class SideBar extends Component {
  state = {

  }

  render() {
    // create menu
    const menuInfo = [
      {
        icon: "dbIcon",
        iconName: "Database",
        // you can set the base path redirect in the MainPanel component with a redirect 
        // like this: <Redirect from="/Database" exact to="/Database/DBDashBoard" />
        basePath: "/Database",
        defaultIconImage: "<i class='fas fa-database'></i>",
        links: {
          DashBard: { name: "Database Dashboard", icon: "<i class='fas fa-database'></i>", link: "/DBDashBoard" },
          Tables: { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/DBTables" }
        }
      },
      {
        icon: "settingIcon",
        iconName: "Settings",
        basePath: "/Settings",
        defaultIconImage: "<i class='fas fa-database'></i>"
      },
      {
        icon: "documentationIcon",
        iconName: "Docs",
        basePath: "/Docs",
        defaultIconImage: "<i class='fas fa-database'></i>"
      }
    ];

    // build JSX for menu 
    const menu = (
      // out put list
      <div>
        {menuInfo.map(menuItem => {
          return (
          // special component that allows us to know which path is active via the to={}
          <NavLink to={menuItem.basePath} key={menuItem.basePath}>
            {/* load menu item with necessary information */}
            <MenuItem icon={menuItem.icon} name={menuItem.iconName} active={this.props.path.includes(menuItem.basePath) ? true : false} />  
          </NavLink>
        )})}
      </div>
    );

    // set active bar position, if necessary
    const activeBarStyle = {};
    // loop over menu info and find where the bar is supposed to be
    for (let i = 0; i < menuInfo.length; i++) {
      if (this.props.path === menuInfo[i].basePath) {
        // set the style by timesing the size of the menu item block (96 pixels) by the index
        activeBarStyle.marginTop = 96 * i;
        // once we got it breakdown of the loop
        break;  
      }
    }

    return (
      <div>
        <div className="sideBar">
          <div className="activeBar" style={activeBarStyle}></div>
          {menu}
        </div>
        <div className="subSideBar">

        </div>
      </div>
    )
  }
}

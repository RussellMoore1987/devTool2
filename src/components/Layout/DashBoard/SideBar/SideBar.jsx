import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
// component
import MenuItem from './MenuItem/MenuItem.jsx';
// CSS
import './SideBar.css';

export default class SideBar extends Component {
  state = {
    subMenuName : '',
    subMenuBasePath : '',
    subMenu : []
  }

  // create menu, class property
  menuInfo = [
    {
      icon: "dbIcon",
      iconName: "Database",
      // you can set the base path redirect in the MainPanel component with a redirect 
      // like this: <Redirect from="/Database" exact to="/Database/DBDashBoard" />
      basePath: "/Database",
      defaultIconImage: "<i class='fas fa-database'></i>",
      links: [
        { name: "Database Dashboard", icon: "<i class='fas fa-database'></i>", link: "/DBDashBoard" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables2" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables3" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables4" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables5" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables6" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables7" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables8" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables9" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables10" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables11" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables12" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables13" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables14" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables15" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables16" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables17" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables18" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables19" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables20" },
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTables21" }
      ]
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
      defaultIconImage: "<i class='fas fa-database'></i>",
      links: [
        { name: "link 1", icon: "<i class='fas fa-database'></i>", link: "/link1" },
        { name: "link 2", icon: "<i class='fas fa-database'></i>", link: "/link2" }
      ]
    }
  ];

  // menu container leave handler
  menuContainerLeaveHandler = () => {
    // get sidebar container
    const sideBarContainer = document.querySelector('.sideBarContainer');
    sideBarContainer.classList.remove('openSideBar') ; 
  }

  // menuItem hover  handler
  menuItemHoverHandler = (menuItem) => {
    // check to see if you're hovering over a menu item
    if (menuItem.target.classList && menuItem.target.classList.contains("menuItem")) {
      // get data type
      const menuName = menuItem.target.dataset.type;
      for (let i = 0; i < this.menuInfo.length; i++) {
        // see if the menuItem has any sub menu links
        const element = this.menuInfo[i];
        if (element.icon === menuName) {
          // get sidebar container
          const sideBarContainer = document.querySelector('.sideBarContainer');
          // check to see if it has a sub menu
          if (element.links) {
            // if so check to see what menu is active so you don't keep on resetting it over and over again
            if (!(this.state.subMenuName === menuName)) {
              this.setState({
                subMenuName: menuName,
                subMenu: element.links,
                subMenuBasePath: element.basePath
              })
            }
            // check to see if sub Menu is open
            if (!(sideBarContainer.classList.contains('openSideBar'))) {
              sideBarContainer.classList.add('openSideBar'); 
            }
          } else {
            // check to see if sub Menu needs to be closed
            if (sideBarContainer.classList.contains('openSideBar')) {
              sideBarContainer.classList.remove('openSideBar'); 
            }
          }
          break;
        } 
      }
    }
  };

  render() {
    // build JSX for menu 
    const menu = (
      // out put list
      <div>
        {this.menuInfo.map(menuItem => {
          return (
          // special component that allows us to know which path is active via the to={}
          <NavLink to={menuItem.basePath} key={menuItem.basePath}>
            {/* load menu item with necessary information */}
            <MenuItem 
            icon={menuItem.icon} 
            name={menuItem.iconName} 
            active={this.props.path.includes(menuItem.basePath) ? true : false} 
            hover={this.menuItemHoverHandler.bind(this)}/>  
          </NavLink>
        )})}
      </div>
    );

    // build JSX for sub menu
    const subMenu = (
      // output list
      // react.fragment is just a wrapper so that I don't have to use a div
      <React.Fragment>
        {this.state.subMenu.map((link, index) => {
          return (
            <NavLink to={this.state.subMenuBasePath + link.link} key={link.link}>
              <div className="subMenuItem" style={{animationDelay: (index * 100 + 300) + "ms"}}>{link.name}</div>
            </NavLink>
          )
        })}
      </React.Fragment>
    )

    // set active bar position, if necessary
    const activeBarStyle = {};
    // loop over menu info and find where the bar is supposed to be
    for (let i = 0; i < this.menuInfo.length; i++) {
      if (this.props.path === this.menuInfo[i].basePath) {
        // set the style by timesing the size of the menu item block (96 pixels) by the index
        activeBarStyle.marginTop = 96 * i;
        // once we got it breakdown of the loop
        break;  
      }
    }

    // returning main JSX
    return (
      <div className="sideBarContainer" onMouseLeave={this.menuContainerLeaveHandler}>
        <div className="sideBar">
          <div className="activeBar" style={activeBarStyle}></div>
          {menu}
        </div>
        <div className="subSideBar">
          {subMenu}
        </div>
      </div>
    )
  }
}

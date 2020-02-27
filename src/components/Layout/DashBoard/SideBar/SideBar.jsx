import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
// component
import MenuItem from './MenuItem/MenuItem.jsx';
// CSS
import './SideBar.css';

export default class SideBar extends Component {
  // @ state
  state = {
    subMenuName : '',
    subMenuBasePath : '',
    subMenu : [],
  }

  // @ create menu, class property
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
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/ViewTable10" },
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
        { name: "Database View Tables", icon: "<i class='fas fa-database'></i>", link: "/View21" }
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

  // @ check if we need to re-render 
  // supporting the menu remainder may be necessary
  componentDidUpdate = () => {
    // # reset logic
    this.reset()
  };

  componentDidMount = () => {
    // # reset logic
    // if somebody refreshes the page and their settings were on menuStage3 check to see if we need to reset
    this.reset()
  }

  // @ reset component logic to activate submenus
  reset = () => {
    // this checks whether or not we need to do a special case of resetting the component for the sub menu, if the menu is selected in a particular way it needs to show the active 
    // determining which submenus to use, setting up necessary variables
    let subMenuData = this.state.subMenu;
    let subMenuBasePath = this.state.subMenuBasePath;
    // check to see if we need to get the active menu
    const mainDashBoard = document.querySelector(".mainDashBoard");
    if (mainDashBoard && mainDashBoard.classList.contains('activateMenu')) {
      // get active menu item data type, name for finding menu options
      const activeMenuItemName = document.querySelector(".menuItem.active").dataset.type;
      // loop over menuInfo and get active menu sub menu items
      for (let i = 0; i < this.menuInfo.length; i++) {
        const menuItem = this.menuInfo[i];
        if (menuItem.icon === activeMenuItemName && menuItem.links) {
          // set variables so sub menus work correctly
          subMenuBasePath = menuItem.basePath;
          subMenuData = menuItem.links; 
          // take off class so menu will work as normal
          mainDashBoard.classList.remove('activateMenu');
          // reset state in order to set all things in their proper order, not the most efficient but not sure what else to do at the moment
          this.setState({
            subMenuName: activeMenuItemName,
            subMenuBasePath: subMenuBasePath,
            subMenu: subMenuData
          });
          // we did what we wanted to now break out of the loop
          break;
        }
      }
    }
  }

  // @ menu container leave handler
  menuContainerLeaveHandler = () => {
    // get sidebar container
    const sideBarContainer = document.querySelector('.sideBarContainer');
    sideBarContainer.classList.remove('openSideBar') ; 
  }

  // @ menuItem click handler
  menuItemClickHandler = () => {
    // get activeBar
    const activeBar = document.querySelector('.activeBar');
    // add and then remove animation
    activeBar.classList.add('moving')
    setTimeout(() => {
      activeBar.classList.remove('moving')
    }, 1000);
    // get sub menu active bar
    const subActiveBar = document.querySelector('.subActiveBar');
    // add and then remove animation
    subActiveBar.classList.add('moving')
    setTimeout(() => {
      subActiveBar.classList.remove('moving')
    }, 1000);
  }

  // @ menuItem hover  handler
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
                subMenuBasePath: element.basePath,
                subMenu: element.links
              });
              // get sub menu active bar
              const subActiveBar = document.querySelector('.subActiveBar');
              // add and then remove animation
              subActiveBar.classList.add('moving')
              setTimeout(() => {
                subActiveBar.classList.remove('moving')
              }, 1000);
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
            // remove menu options
            this.setState({
              subMenuName: "",
              subMenuBasePath: "",
              subMenu: []
            });
          }
          break;
        } 
      }
    }
  };

   // @ subMenuItem click handler
   subMenuItemClickHandler = (e) => {
    // get activeBar
    const activeBar = document.querySelector('.activeBar');
    // get main variables for comparing path
    const goingTo = e.target.dataset.path;
    const cameFrom = this.props.path;
    // because were dealing with subMenuItems we need just the first part, split the string into an array
    const cameFromArray = cameFrom.split('/');
    // grab the second item in the array the first one is blank, /database/viewTables = [""=0]/["database"=1]/["viewTables"=2]
    // reformatted th string so we can see if it contains the same base path as where we are going
    const cameFromBasePath = '/' + cameFromArray[1] + '/';
    // console.log('goingTo ' + goingTo, 'cameFromBasePath ' + cameFromBasePath);
    // check to see if the base path is different, so we don't put the move animation on if it doesn't need it
    if (!goingTo.includes(cameFromBasePath)) {
      // add and then remove animation
      activeBar.classList.add('moving')
      setTimeout(() => {
        activeBar.classList.remove('moving')
      }, 1000);
    }

    // get sub menu active bar
    const subActiveBar = document.querySelector('.subActiveBar');
    // add and then remove animation
    subActiveBar.classList.add('moving')
    setTimeout(() => {
      subActiveBar.classList.remove('moving')
    }, 1000);
  }

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
            click={this.menuItemClickHandler} 
            hover={this.menuItemHoverHandler.bind(this)}/>  
          </NavLink>
        )})}
      </div>
    );

    // determining which submenus to use, setting up necessary variables
    let subMenuData = this.state.subMenu;
    let subMenuBasePath = this.state.subMenuBasePath;
    // build JSX for sub menu
    let subMenu = (
      // output list
      // react.fragment is just a wrapper so that I don't have to use a div
      <React.Fragment>
        {subMenuData.map((link, index) => {
          return (
            <NavLink to={subMenuBasePath + link.link} key={link.link}>
              <div 
              className={subMenuData.length - 1 === index ? "subMenuItem last" : "subMenuItem"}
              data-path={subMenuBasePath + link.link} 
              style={{animationDelay: (index * 100 + 300) + "ms"}}
              onClick={this.subMenuItemClickHandler.bind(this)}>
                {link.name}
              </div>
            </NavLink>
          )
        })}
      </React.Fragment>
    )

    // check to see if we have a menu
    if (subMenu.props.children.length <= 0) {
      // no menu put a message in their
      subMenu = <div className="noSubMenu text-center"><p>No Menu Items Were Found</p></div>;
    }
    

    // set active bar position, if necessary
    const activeBarStyle = {};
    // loop over menu info and find where the bar is supposed to be
    for (let i = 0; i < this.menuInfo.length; i++) {
      // see if the URL includes the base path of our menu items and then adjust accordingly
      if (this.props.path.includes(this.menuInfo[i].basePath)) {
        // set the style by timesing the size of the menu item block (96 pixels) by the index
        activeBarStyle.marginTop = 96 * i;
        // once we got it breakdown of the loop
        break;  
      }
    }

    // set sub action bar position, if necessary
    const subActiveBarStyle = {};
    
    // loop over menu info and find where the bar is supposed to be
    for (let i = 0; i < subMenuData.length; i++) {
      // see if the URL includes the path of our sub menu item and then adjust accordingly
      if (this.props.path.includes(subMenuData[i].link)) {
        // set the style by timesing the size of the menu item block by the index
        subActiveBarStyle.top = (40 * i + 1) + 'px';
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
          <div className="subActiveBar" style={subActiveBarStyle}></div>
        </div>
      </div>
    )
  }
}

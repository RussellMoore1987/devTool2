import React from 'react'
import MainModal from '../MainModal/MainModal.jsx'
import formBackgroundImg from "../../assets/images/hot-air-balloon-2411851.jpg";
import LoginLayout from './LoginLayout/LoginLayout.jsx'
import DashBoard from './DashBoard/DashBoard.jsx'
import styles from './Layout.module.css';

const Layout = (props) => {
  // Determine mode and rendered accordingly
  let layout = null;
  switch (props.mode) {
    case "login": layout = <DashBoard />;break;
    default: layout = <LoginLayout />; break;
  }

  // Determine whether or not to show modal
  let modal = null;
  if (props.useModal) {
    modal = <MainModal />;
  }

  // background image
  const formBackground = {backgroundImage: `url(${formBackgroundImg})`};
  
  /* 
    - These two variables ({modal} and {layout}) are set above
    - If the model is there it will appear
    - The two different layouts are dashboard and log
  */
  return (
    // Modal
    <div style={formBackground } className={styles.mainLayout}>
      {modal}
      {layout}  
    </div>
  )
}

export default Layout

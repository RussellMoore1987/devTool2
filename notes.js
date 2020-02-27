// notes for devTool
    // TODO: 
        // cookie storage to save authentication token??? security risks
            // authentication token also tracks
                // IP address
                // location
                // authentication token
                // and any other measure to make sure they're logging in from the exact same computer and same location 
        // store other settings in cookies full-screen, dark mode


    // lesson 35 Working with Props
    // lesson 36 Understanding the Children Property

    // css Modules 
    // https://create-react-app.dev/docs/adding-a-css-modules-stylesheet
    // https://www.udemy.com/react-the-complete-guide-incl-redux/learn/lecture/12001122#overview

    // file structure
    // https://www.udemy.com/react-the-complete-guide-incl-redux/learn/lecture/8103728#overview

    // ajax
    // https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/13556512#overview
    // command
    // npm install axios --save
    // Docs
    // https://github.com/axios/axios

    // animations
    // https://www.udemy.com/react-the-complete-guide-incl-redux/learn/lecture/8346492#overview
    // install https://www.udemy.com/react-the-complete-guide-incl-redux/learn/lecture/8346458#overview
    // https://www.youtube.com/watch?v=BZRyIOrWfHU help on appear

    // context, use method two, Can use either depending on situation
    // https://www.youtube.com/watch?v=OvM4hIxrqAw&t=1346s

    // css animations 
    // https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8346458#overview
    // command
    // npm install react-transition-group --save
    // Docs
    // https://reactcommunity.org/react-transition-group/

    // Icon animations ???
    // https://www.npmjs.com/package/react-lottie

    // get started do normal videos
// notes for Recipe app


// ! start videos
    // in resources project, React/_notes.js


// ! problem with edge and react project https://github.com/facebook/create-react-app/issues/8084






// css transitions
// .login-fade-enter {
//     opacity: 0;
// }

// .login-fade-enter-active {
//     opacity: 1;
// }

// .login-fade-enter-done {
//     opacity: 1;
// }

// .login-fade-exit {
//     opacity: 0;
// }
// .login-fade-exit-active {
//     opacity: 0;
// }

// .login-fade-appear{
//     opacity: 0;
// }

// .login-fade-appear-active{
//     opacity: 1;
// }

// .login-fade-appear-done{
//     opacity: 1;
// }

// <CSSTransition in={animationIn} appear={true} mountOnEnter unmountOnExit classNames="login-fade" timeout={animationTiming}
//     onEnter={() => console.log('onEnter')}
//     onEntering={() => console.log('onEntering')}
//     onEntered={() => console.log('onEntered')}
//     onExit={() => console.log('onExit')}
//     onExiting={() => console.log('onExiting')}
//     onExited={() => console.log('onExited')}
// >
//     <div className={styles.loginContainer}>
//         <div className={styles.loginBg + " flex-center"}>
//             <img src={loginArt} alt="" />
//         </div> 
//     </div>
// </CSSTransition>


import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// components/pages/routes
import DBDashBoard from "./Routes/DBDashBoard/DBDashBoard.jsx";
// css
import './MainPanel.css'

export default function MainPanel() {

    // check to see if we are using Firefox, CSS workaround, couldn't figure out what was going on.
    let style = {};
    if (navigator.userAgent.indexOf("Firefox") > -1) {
      style = {height: "calc(100% - 75px)"};
    }
    console.log("Firefox", navigator.userAgent.indexOf("Firefox") > -1);

    return (
        <div className="mainPanel" style={style}>
            <Switch>
                {/* database routes */}
                <Route path="/Database/DBDashBoard" component={DBDashBoard} /> 
                <Route path='/Database/ViewTables' render={() => <h1>View Tables home</h1>} />
                <Route path='/Database/ViewTable10' render={() => <h1>View Tables 10 home</h1>} />
                <Route path='/Database/View21' render={() => <h1>View Tables 21 home</h1>} />
                    {/* if base path is clicked on for specific route give appropriate redirect */}
                    <Redirect from="/Database" exact to="/Database/DBDashBoard" />
                {/* settings routes */}
                <Route path='/Settings' render={() => <h1>Settings home</h1>} />
                {/* documentation routes */}
                <Route path='/Docs' render={() => <h1>Documentation home</h1>} />
                {/* main default route, catches all, link to whatever default route you would like */}
                <Redirect to="/Database/DBDashBoard" />
            </Switch>
        </div>
    )
}

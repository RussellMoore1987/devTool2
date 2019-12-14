import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// css
import './MainPanel.css'

export default function MainPanel() {
    return (
        <div className="mainPanel">
            <Switch>
                {/* database routes */}
                <Route path='/Database/DBDashBoard' render={() => <h1>DBDashBoard home</h1>} />
                <Route path='/Database/ViewTables' render={() => <h1>View Tables home</h1>} />
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

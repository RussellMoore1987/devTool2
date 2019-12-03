import React, { Component } from 'react'
// context
import ShopContext from "./shop-context";

class GlobalState extends Component {
     // set state
    state = {
        tables: ["users", "posts", "tags", "labels", "categories", "mediaContent", "content"],
        loggedIn: false,
        action: null
    }

    // logging in was successful switch layout to dashboard
    loginHandler = () => {
        this.setState({loggedIn: true});
    };

    render() {
        // Returns children but provides wrapper Component functionality, Allows us to hold state in here instead of the app JS
        return (
            // this allows all elements to have access to the react context API
            <ShopContext.Provider value={{ 
                loggedIn: this.state.loggedIn,  
                action: this.state.action,
                loginHandler: this.loginHandler
            }}>
                {this.props.children}
            </ShopContext.Provider>);
    }
}

export default GlobalState;

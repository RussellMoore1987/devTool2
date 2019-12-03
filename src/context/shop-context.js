import React from "react";

export default React.createContext({
    // Add object for code hinting
    tables: ["users", "posts", "tags", "labels", "categories", "mediaContent", "content"],
    loggedIn: false,
    action: null
});
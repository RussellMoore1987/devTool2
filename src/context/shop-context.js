import React from "react";

export default React.createContext({
    // Add object for code hinting
    // ! Add other things what I know what the structure really should look like
    tableData: {
        pageNumber: 2,
        totalPages: 10,
        numberOfRecords: 5,
        columns: ["first_name", "last_name", "address", "email", "phone", "owes", "lastPayment"],
        records: [
            {
                first_name: "Sabrina", 
                last_name: "Warhol", 
                address: "136 S. 1350 E. Detroit, TX 81614", 
                email: "sabrina_warhol@gmail.com", 
                phone: "(435) 987-3422",
                owes: "4050",
                lastPayment: "7/1/19"
            },
            {
                first_name: "Rob", 
                last_name: "Nilsson", 
                address: "Vincent Street Los Angeles, CA 81664", 
                email: "rob_nilsson@gmail.com", 
                phone: "(801) 573-5784",
                owes: "2000",
                lastPayment: "8/1/19"
            },
            {
                first_name: "Rayla", 
                last_name: "Smith", 
                address: "West Avenue Salt Lake City, UT 84321", 
                email: "rayla_sun_star@gmail.com", 
                phone: "(640) 478-3720",
                owes: "33",
                lastPayment: "4/1/19"
            },
            {
                first_name: "Aspen", 
                last_name: "Jones", 
                address: "36 E. 200 N. Farmington, UT 84117", 
                email: "aspen_jones@gmail.com", 
                phone: "(372) 432-0983",
                owes: "0",
                lastPayment: "8/1/19"
            },
            {
                first_name: "Olivia", 
                last_name: "Hendrickson", 
                address: "Cherry Creek Lane 1264 Richmond, VA 81772", 
                email: "olivia89@gmail.com", 
                phone: "(849) 893-0098",
                owes: "12",
                lastPayment: "8/1/19"
            }
        ]
    },
    mode: "login",
    tables: ["users", "posts", "tags", "labels", "categories", "mediaContent", "content"],
    loggedIn: false,
    action: null
});
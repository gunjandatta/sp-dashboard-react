import * as React from "react";
import { render } from "react-dom";
import { Configuration } from "./cfg";
import { Dashboard } from "./dashboard";
import Strings from "./strings";

// Import the datatables.net library
import "jquery";
import "datatables.net";
import "datatables.net-bs4";

// Create the global variable for this solution
window[Strings.GlobalVariable] = {
    Configuration
}

// Get the main element to render the solution to
let el = document.getElementById(Strings.AppElementId);
if (el) {
    // Initialize the dashboard
    render(<Dashboard />, el);
} else {
    // Log
    console.log("[" + Strings.ProjectName + "] Error finding the element with id '" + Strings.AppElementId + "'");
}
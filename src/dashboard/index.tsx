import * as React from "react";
import { List, SPTypes } from "gd-sprest-bs";
import Strings from "../strings";
import { DataTable } from "./datatable";
import { Filter } from "./filter";
import { Navigation } from "./navigation";
import "./styles";

// Dashboard Properties
interface IDashboardProps { }

// Dashboard State
interface IDashboardState {
    displayFormUrl: string;
    newFormUrl: string;
}

/**
 * Dashboard
 */
export class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
    // Constructor
    constructor(props, state) {
        super(props, state);

        // Set the state
        this.state = {
            displayFormUrl: null,
            newFormUrl: null
        };

        // Load the form urls
        this.load();
    }

    // Render the dashboard
    render() {
        let table: DataTable = null;
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <Navigation
                            formUrl={this.state.newFormUrl}
                            onSearch={value => { table.search(value); }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Filter
                            onFilter={value => { table.filter(value); }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <DataTable
                            formUrl={this.state.displayFormUrl}
                            ref={obj => { table = obj; }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Private Methods
     */

    // Loads the form urls
    private load() {
        // Load the list forms
        List(Strings.Lists.Main).Forms().execute(forms => {
            let newState: IDashboardState = Object.create(this.state);

            // Parse the forms
            for (let i = 0; i < forms.results.length; i++) {
                let form = forms.results[i];

                // Save the url, based on the type
                switch (form.FormType) {
                    // Display
                    case SPTypes.PageType.DisplayForm:
                        newState.displayFormUrl = form.ServerRelativeUrl;
                        break;

                    // New
                    case SPTypes.PageType.NewForm:
                        newState.newFormUrl = form.ServerRelativeUrl;
                        break;
                }
            }

            // Update the state
            this.setState(newState);
        });
    }
}
import * as React from "react";
import { Helper, jQuery, List, SPTypes, Types } from "gd-sprest-bs";
import { Components, Table } from "gd-sprest-bsx";
import Strings from "../strings";

// Data Table Properties
interface IDataTableProps {
    formUrl: string;
}

// Data Table State
interface IDataTableState {
    filter: string;
    items: Array<Types.SP.ListItem>;
}

/**
 * Data Table
 */
export class DataTable extends React.Component<IDataTableProps, IDataTableState> {
    private _datatable = null;
    private _searchText: string = null;
    private _table: Components.ITable = null;

    // Constructor
    constructor(props, state) {
        super(props, state);

        // Set the state
        this.state = {
            filter: null,
            items: null
        };

        // Load the items
        this.load();
    }

    // We need to remove the datatable plugin on re-render of the component
    componentWillUpdate(newProps: IDataTableProps, newState: IDataTableState) {
        // See if we are reloading the data
        if (this.state.filter != newState.filter) {
            // See if the datatable exists
            if (this._datatable) {
                // Destroy the table
                this._datatable.destory(true);
                this._datatable = null;
            }

            // Reload the data
            this.load(newState.filter);
        }
    }

    // We need to apply the datatable plugin after the table is rendered
    componentDidUpdate() {
        // Ensure the table is rendered
        if (this._table && this.state.items) {
            // Apply the data table plugin
            this._datatable = jQuery(this._table.el).DataTable();

            // See if a search query exists
            if (this._searchText) {
                // Filter the table
                this._datatable.search(this._searchText).draw();
            }
        }
    }

    // Renders the filter
    render() {
        return (this.state.items == null ? null :
            <Table
                assignTo={obj => { this._table = obj; }}
                rows={this.state.items}
                columns={[
                    {
                        name: "",
                        title: "Title",
                        onRenderCell: (el, column, item: Types.SP.ListItem) => {
                            // Render a button
                            Components.Button({
                                el,
                                text: item.Title,
                                onClick: () => {
                                    // Show the display form
                                    Helper.SP.ModalDialog.showModalDialog({
                                        title: "View Item",
                                        url: this.props.formUrl + "?ID=" + item.Id,
                                        dialogReturnValueCallback: result => {
                                            // See if the item was updated
                                            if (result == SPTypes.ModalDialogResult.OK) {
                                                // Refresh the page
                                                document.location.reload();
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    },
                    {
                        name: "ItemType",
                        title: "Item Type"
                    },
                    {
                        name: "Status",
                        title: "Status"
                    }
                ]}
            />
        );
    }

    /**
     * Private Methods
     */

    // Loads the data
    private load(filter?: string) {
        // Load the list items
        List(Strings.Lists.Main).Items().query({
            Filter: filter ? "Status eq '" + filter + "'" : null
        }).execute(items => {
            // Update the state
            this.setState({ items: items.results as any });
        });
    }

    /**
     * Public Methods
     */

    // Filters the table
    filter(value: string) {
        // Update the state
        this.setState({ filter: value, items: null });
    }

    // Searches the table
    search(value: string) {
        // Save the value
        this._searchText = value;

        // Search the table
        this._datatable ? this._datatable.search(value).draw() : null;
    }
}
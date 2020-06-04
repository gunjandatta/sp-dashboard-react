import * as React from "react";
import { Helper, SPTypes } from "gd-sprest-bs";
import { Components, Navbar } from "gd-sprest-bsx";

// Navigation Properties
interface INavigationProps {
    formUrl: string;
    onSearch: (value: string) => void;
}

/**
 * Navigation
 */
export class Navigation extends React.Component<INavigationProps> {
    // Renders the filter
    render() {
        return (
            <Navbar
                brand="Dashboard"
                type={Components.NavbarTypes.Primary}
                searchBox={{
                    hideButton: true,
                    onChange: value => {
                        // Execute the search event
                        this.props.onSearch(value);
                    },
                    onSearch: value => {
                        // Execute the search event
                        this.props.onSearch(value);
                    }
                }}
                items={[
                    {
                        text: "New Item",
                        onClick: () => {
                            // Display a new item form
                            Helper.SP.ModalDialog.showModalDialog({
                                title: "New Item",
                                url: this.props.formUrl,
                                dialogReturnValueCallback: result => {
                                    // See if an item was created
                                    if (result == SPTypes.ModalDialogResult.OK) {
                                        // Refresh the page
                                        document.location.reload();
                                    }
                                }
                            });
                        }
                    },
                    {
                        text: "Reports",
                        onClick: () => { }
                    },
                    {
                        text: "Administration",
                        onClick: () => { }
                    },
                    {
                        text: "Help",
                        items: [
                            {
                                text: "Common Questions",
                                href: "#"
                            },
                            {
                                text: "How To",
                                href: "#"
                            },
                            {
                                text: "Contact",
                                href: "#"
                            }
                        ],
                        onClick: (item, ev) => {
                            // Prevent postback
                            ev.preventDefault();

                            // Display the page in a modal
                            Helper.SP.ModalDialog.showModalDialog({
                                showMaximized: true,
                                title: item.text,
                                url: item.href
                            });
                        }
                    }
                ]}
            />
        );
    }
}
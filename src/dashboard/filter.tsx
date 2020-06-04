import * as React from "react";
import { Card, CheckboxGroup, Components } from "gd-sprest-bsx";

// Filter Properties
interface IFilterProps {
    onFilter: (value: string) => void;
}

/**
 * Filter
 */
export class Filter extends React.Component<IFilterProps> {
    // Renders the filter
    render() {
        return (
            <Card
                body={[
                    {
                        content: <CheckboxGroup
                            isInline={true}
                            type={Components.CheckboxGroupTypes.Switch}
                            items={[
                                { label: "Draft" },
                                { label: "Submitted" },
                                { label: "Rejected" },
                                { label: "Pending Approval" },
                                { label: "Approved" },
                                { label: "Archived" }
                            ]}
                            onChange={(item: Components.ICheckboxGroupItem) => {
                                // Call the change event
                                this.props.onFilter(item ? item.label : "");
                            }}
                        />
                    }
                ]}
            />
        );
    }
}
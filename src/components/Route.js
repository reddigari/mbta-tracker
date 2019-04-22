import React, { Component } from 'react';
import Select from 'react-select';


export class RouteNav extends Component {
    constructor(props) {
        super(props);
        this.state = { route: null };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (selectedOption) => {
        this.setState({ route: selectedOption });
        this.props.onChange(selectedOption.id);
    }

    render() {
        if (!this.props.routes.length) {
            return <div />;
        }

        function getName(route) {
            console.log(route);
            const desc = route.attributes.description;
            return desc.includes("Bus") || desc.includes("Limited") ?
                route.attributes.short_name : route.attributes.long_name;
        }

        return (
            <div className="col-md-4">
                <Select options={this.props.routes} onChange={this.handleChange}
                        value={this.state.route}
                        getOptionValue={r => r.id}
                        getOptionLabel={r => getName(r)}
                        isSearchable={true} isClearable={true} />
            </div>
        )
    }
}

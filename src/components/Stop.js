import React, { Component } from 'react';
import Select from 'react-select';

export class StopNav extends Component {
    constructor(props) {
        super(props);
        this.state = { stop: null };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (selectedOption) => {
        this.setState({ stop: selectedOption });
        this.props.onChange(selectedOption.id, selectedOption.attributes.name);
    }
    render() {
        if (!this.props.stops.length) {
            return <div />;
        }
        return (
            <div className="col-md-4">
                <Select options={this.props.stops} onChange={this.handleChange}
                        value={this.state.stop}
                        getOptionValue={s => s.id}
                        getOptionLabel={s => s.attributes.name}
                        isSearchable={true} isClearable={true} />
            </div>
        )
    }
}

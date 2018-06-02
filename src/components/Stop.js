import React, { Component } from 'react';

export class Stop extends Component {
    render() {
        return (
            <button onClick={this.props.onClick}
                    className="btn mx-1 my-1">
                {this.props.stop.name}</button>
        )
    }
}

export class StopNav extends Component {
    render() {
        if (this.props.stops.length === 0) {
            return ( <div /> )
        }

        return (
            <div className="row justify-content-center">
            {this.props.stops.map((stop) => (
                <Stop key={stop.id} 
                      stop={stop.attributes}
                      stopId={stop.id}
                      onClick={() => this.props.onClick(stop.id, stop.attributes.name)}
                />
            ))}
            </div>
        )
    }
}

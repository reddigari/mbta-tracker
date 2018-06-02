import React, { Component } from 'react';

export class ArrivalRow extends Component {
    render() {
        const dt = new Date(this.props.arrival.arrival_time);
        const timeStr = dt.toLocaleTimeString();
        const now = new Date();
        const countdown = Math.ceil((dt - now) / 60000)

        return (
            <tr> 
                <td>{this.props.route}</td>
                <td>{timeStr}</td>
                <td>{countdown} min</td>
                <td>{this.props.dir}</td>
            </tr>
        )
    }
}

export class ArrivalTable extends Component {
    render() {
        if (this.props.arrivals.length === 0) {
            return ( <div /> )
        }

        return (
            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <h3>{this.props.stopName}</h3>
                </div>
                <div className="col-md-6">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Route</th>
                                <th>Time</th>
                                <th>Countdown</th>
                                <th>Direction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.arrivals
                                .filter((arr) => arr.attributes.arrival_time != null)
                                .map((arr) => {
                                    const routeId = arr.relationships.route.data.id;
                                    const arrivalDir = arr.attributes.direction_id;
                                    return (
                                        <ArrivalRow key={arr.id} 
                                                    arrival={arr.attributes} 
                                                    route={routeId}
                                                    dir={this.props.directions[routeId]
                                                            ? this.props.directions[routeId][arrivalDir]
                                                            : '' 
                                                    }
                                        />
                                    )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


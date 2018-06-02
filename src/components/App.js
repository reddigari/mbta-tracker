import React, { Component } from 'react';
import { TransitNav } from './Transit'
import { RouteNav } from './Route';
import { StopNav } from './Stop';
import { ArrivalTable } from './Arrival';
import '../styles/App.css'

function fetchData(endpoint) {
    const URI = `https://api-v3.mbta.com/${endpoint}`
    return fetch(URI)
            .then((resp) => resp.json())
            .then((data) => data.data)
            .catch((err) => console.log(err));
}


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transit: null,
            routes: [],
            stops: [],
            routeId: null,
            stopId: null,
            stopName: null,
            arrivals: []
        }

        this.getRoutes = this.getRoutes.bind(this);
        this.getStops = this.getStops.bind(this);
        this.getArrivals = this.getArrivals.bind(this);
        this.handleTransitClick = this.handleTransitClick.bind(this);
        this.handleRouteClick = this.handleRouteClick.bind(this);
        this.handleStopClick = this.handleStopClick.bind(this);
    }

    componentDidMount() {
        fetchData('routes')
            .then((routes) => {
                var directions = {};
                routes.forEach((route) => {
                    directions[route.id] = route.attributes.direction_names;
                });
                this.setState({
                    directions: directions
                });
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.transit !== this.state.transit) this.getRoutes();
        else if (prevState.routeId !== this.state.routeId) this.getStops();
        else if (prevState.stopId !== this.state.stopId) this.getArrivals();
    }

    getRoutes() {
        const typeVal = this.state.transit;
        fetchData(`routes?filter[type]=${typeVal}`)
            .then((routes) => {
                this.setState({
                    routes: routes
                });
            });
    }

    getStops() {
        const routeId = this.state.routeId;
        const endpoint = `stops?filter[route]=${routeId}`;
        fetchData(endpoint)
            .then((stops) => {
                this.setState({
                    stops: stops
                });
            });
    }

    getArrivals() {
        const stopId = this.state.stopId;
        const endpoint = `predictions?filter[stop]=${stopId}`;
        fetchData(endpoint)
            .then((arrivals) => {
                this.setState({
                    arrivals: arrivals
                });
            });
    }

    handleTransitClick(typeVal) {
        this.setState({
            transit: typeVal,
            stops: [],
            stopId: null,
            arrivals: []

        });
    }

    handleRouteClick(routeId) {
        this.setState({
            routeId: routeId,
            stopId: null,
            arrivals: []
        });
    }

    handleStopClick(stopId, stopName) {
        this.setState({
            stopId: stopId,
            stopName: stopName
        });
    }

    render() {
        return (
            <div className="container">
                <h1 style={{textAlign: 'center'}}>MBTA</h1>
                <TransitNav onClick={this.handleTransitClick}/>
                <hr />
                <RouteNav
                    routes={this.state.routes}
                    onClick={this.handleRouteClick}
                />
                <hr />
                <StopNav
                    stops={this.state.stops}
                    onClick={this.handleStopClick}
                />
                <hr />
                <ArrivalTable 
                    stopName={this.state.stopName}
                    arrivals={this.state.arrivals}
                    directions={this.state.directions}     
                />
            </div>
        )
    }

}

export default App;

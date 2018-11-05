import React, { Component } from 'react';

const style = {
    color: 'white',
}

export class Route extends Component {
    render() {
        const routeDesc = this.props.route.description;
        const name = (routeDesc.includes("Bus") || routeDesc.includes("Limited")) ?
            this.props.route.short_name : this.props.route.long_name;
        const color = "#" + this.props.route.color;
        return (
            <button onClick={this.props.onClick}
                    style={{...style, backgroundColor: color}}
                    className="btn btnRoute mx-1 my-1">
                {name}
            </button>
        )
    }
}

export class RouteNav extends Component {
    render() {
        if (this.props.routes.length === 0) {
            return ( <div /> )
        }

        return (
            <div className="row justify-content-center">
                {this.props.routes.map((route) => (
                    <Route key={route.id} 
                           route={route.attributes}
                           routeId={route.id}
                           onClick={() => this.props.onClick(route.id)} />
                ))}
            </div>
        )
    }
}

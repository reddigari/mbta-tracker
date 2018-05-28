import React, { Component } from 'react';

const style = {
    color: 'white',
    backgroundColor: 'gray'
}

export class Transit extends Component {
    render() {
        return (
            <button onClick={() => this.props.onClick(this.props.typeValue)}
                    className="btn btnTransit mx-1 my-1" style={style}>
                {this.props.name}
            </button>
        )
    }
}

export class TransitNav extends Component {
    render() {
        return (
            <div className="row justify-content-center">
                <Transit name="T" typeValue="0,1"
                         onClick={this.props.onClick} />
                <Transit name="Commuter Rail" typeValue="2"
                         onClick={this.props.onClick} />
                <Transit name="Bus" typeValue="3"
                         onClick={this.props.onClick} />
                <Transit name="Ferry" typeValue="4"
                         onClick={this.props.onClick} />
            </div>
        )
    }
}

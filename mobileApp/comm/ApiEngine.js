import React, { Component } from 'react';
import Overlay  from './Overlay';

class ApiEngine extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
        setTimeout( () => {
            props.root.cancelApi();
        }, 3000);
    }
    render() {
        return (
            <>
            <Overlay title={this.props.root.state.dataEngineStatus}/>
            </>
        );
    }
}
export default ApiEngine;


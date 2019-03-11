import React, {Component} from 'react';
require('../less/loading.css');
class loading extends Component {
    render() {
        return (
            <div className="laoding" id="allloading">
                <div className="loading-style-4">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        );
    }
}
export default loading;
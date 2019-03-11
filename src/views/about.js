import React, {Component} from 'react';
import user from './less/less.less';
class App extends Component {
    render() {
        return (
            <div
                className={user.activeapp+" reactApp"}
                style={{
                height: "100%",
                background: "#fff"
                }}>
                <img src={require('./images/about.jpg')} alt=""/>
            </div>
        );
    }
}

export default App;

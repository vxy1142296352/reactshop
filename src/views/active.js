import React, {Component} from 'react';
import user from './less/less.less';
class App extends Component {
    componentDidMount(){
    }
    render() {
        return (
            <div className={user.activeapp+" reactApp"}>
                <img src={require('./images/active.jpg')} alt=""/>
            </div>
        );
    }
}
export default App;

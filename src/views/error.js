import React, { Component } from 'react';
import user from './less/less.less';
class App extends Component {
  render() {
    return (
	  <div className={user.errorapp+" reactApp"}>
        <img src={require('./images/error.jpg')} alt=""/>
        <p>亲,您的零食走丢了,赶紧找回来吧!</p>
        <a href="/#/">去找找</a>
    </div>
    );
  }
}
export default App;

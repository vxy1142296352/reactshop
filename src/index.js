import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';   //BrowerRouter使用H5 historyAPI
import { Provider } from 'react-redux';
import store from './views/redux/token/reducers/index';
import RouterComponent from './views/router/router';
require ('./views/js/commd');
require('./views/less/base.css');
render(
	<HashRouter >
		<Provider store={store}>
			<RouterComponent  />
		</Provider>
	</HashRouter>,
	document.getElementById('root')
)
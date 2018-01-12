import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/Store';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'


console.log(store.getState())
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import { Provider } from 'react-redux';
import router from './router';
import store from './store.js'
require('es6-promise').polyfill();
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>{router}</Provider>,
  document.getElementById('root'));

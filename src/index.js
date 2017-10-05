import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { start } from './framework';
import model from './model';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

const render = props => ReactDOM.render(<App {...props} />, document.getElementById('root'));

start(render, model);
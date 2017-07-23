// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import AppControl from './AppControl.jsx';

ReactDOM.render(<AppControl><App /></AppControl>, document.getElementById('react-root'));

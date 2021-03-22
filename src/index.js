import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <App rows={10} cols={10} numOfMines={10} />,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AdminSignIn from './AdminSignIn'
import AddStop from './AddStop'
import ViewTickets from './ViewTickets'
import Ticket from './Ticket';
import Editor from './Editor';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Ticket />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

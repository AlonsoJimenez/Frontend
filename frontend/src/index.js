import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SignIn from './AdminSignIn'
import ViewTickets from './ViewTickets'
import EnhancedTable from './TableTickets'

ReactDOM.render(
  <React.StrictMode>
    <ViewTickets />
  </React.StrictMode>,
  document.getElementById('root')
);



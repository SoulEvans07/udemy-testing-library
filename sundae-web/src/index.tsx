import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './root.scss';
import SummaryForm from './pages/summary/SummaryForm';

ReactDOM.render(
  <React.StrictMode>
    <SummaryForm />
  </React.StrictMode>,
  document.getElementById('root')
);

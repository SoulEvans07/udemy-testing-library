import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './root.scss';
import SummaryForm from './pages/summary/SummaryForm';
import Options from './pages/entry/Options';

ReactDOM.render(
  <React.StrictMode>
    <Options optionType="scoops" />
    <SummaryForm />
  </React.StrictMode>,
  document.getElementById('root')
);

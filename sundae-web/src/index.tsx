import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './root.scss';
import OrderEntry from './pages/entry/OrderEntry';
import { Container } from 'react-bootstrap';
import { OrderDetailsProvider } from './contexts/OrderDetails';

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

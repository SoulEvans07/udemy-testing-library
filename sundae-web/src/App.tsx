import { FunctionComponent, ReactElement, useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './root.scss';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import { OrderPhase } from './types/businessTypes';
import { PageProps } from './pages/types';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';

export default function App(): ReactElement {
  const [orderPhase, setOrderPhase] = useState<OrderPhase>('inProgress');

  let Page: FunctionComponent<PageProps>;
  switch (orderPhase) {
    case 'inProgress':
      Page = OrderEntry;
      break;
    case 'review':
      Page = OrderSummary;
      break;
    case 'completed':
      Page = OrderConfirmation;
      break;
  }

  return (
    <Container>
      <OrderDetailsProvider>
        <Page setOrderPhase={setOrderPhase} />
      </OrderDetailsProvider>
    </Container>
  );
}

import { ReactElement } from 'react';
import { Button } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utils/currency-utils';
import { PageProps } from '../types';
import Options from './Options';

export default function OrderEntry(props: PageProps): ReactElement {
  const { setOrderPhase } = props;
  const [orderDetails] = useOrderDetails();

  return (
    <div className="order-entry">
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(orderDetails.totals.grandTotal)}</h2>
      <Button disabled={orderDetails.totals.scoops === 0} onClick={() => setOrderPhase('review')}>
        Order Sundae!
      </Button>
    </div>
  );
}

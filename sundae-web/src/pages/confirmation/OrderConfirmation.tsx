import { ReactElement, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { serverUrl } from '../../config';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { PageProps } from '../types';

export default function OrderConfirmation(props: PageProps): ReactElement {
  const { setOrderPhase } = props;
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState<number>();

  useEffect(() => {
    fetch(serverUrl + '/order', { method: 'POST', body: JSON.stringify({}) })
      .then(res => res.json())
      .then(data => setOrderNumber(data.orderNumber))
      .catch(error => {
        // TODO: handle failed order
      });
  }, []);

  const handleClick = () => {
    resetOrder();
    setOrderPhase('inProgress');
  };

  if (!orderNumber) return <div>Loading</div>;

  return (
    <div className="order-confirmation" style={{ textAlign: 'center' }}>
      <h1>Thank You!</h1>
      <p>Your order number is {orderNumber}</p>
      <p className="fine-print" style={{ fontSize: '25%' }}>
        as per our terms and conditions, nothing will happen now
      </p>
      <Button onClick={handleClick}>Create new order</Button>
    </div>
  );
}

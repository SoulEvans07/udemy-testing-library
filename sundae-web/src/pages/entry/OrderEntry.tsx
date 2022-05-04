import { ReactElement } from 'react';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utils/currency-utils';
import Options from './Options';

export default function OrderEntry(): ReactElement {
  const [orderDetails] = useOrderDetails();

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(orderDetails.totals.grandTotal)}</h2>
    </div>
  );
}

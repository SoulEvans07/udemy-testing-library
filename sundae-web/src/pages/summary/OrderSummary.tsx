import { ReactElement } from 'react';
import './OrderSummary.scss';
import SummaryForm from './SummaryForm';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { PageProps } from '../types';
import { formatCurrency } from '../../utils/currency-utils';

export default function OrderSummary(props: PageProps): ReactElement {
  const { setOrderPhase } = props;
  const [orderDetails] = useOrderDetails();

  const scoopList = Object.entries(orderDetails.scoops).map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingList = Object.keys(orderDetails.toppings).map(key => <li key={key}>{key}</li>);

  return (
    <div className="order-summary">
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(orderDetails.totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {formatCurrency(orderDetails.totals.toppings)}</h2>
      <ul>{toppingList}</ul>
      <h2>Grand Total: {formatCurrency(orderDetails.totals.grandTotal)}</h2>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}

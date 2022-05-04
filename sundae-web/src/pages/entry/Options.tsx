import { ReactElement, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import AlertBanner from '../../components/AlertBanner/AlertBanner';
import { serverUrl } from '../../config';
import { pricePerItem } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { OptionType } from '../../types/businessTypes';
import { formatCurrency } from '../../utils/currency-utils';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import { OptionItem } from './types';

interface OptionsProps {
  optionType: OptionType;
}

export default function Options(props: OptionsProps): ReactElement {
  const { optionType } = props;
  const [orderDetails, updateItemCount] = useOrderDetails();
  const [items, setItems] = useState<OptionItem[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    fetch(serverUrl + '/' + optionType)
      .then(res => res.json())
      .then(options => setItems(options))
      .catch(err => {
        setError(err.message);
      });
  }, []);

  if (error) return <AlertBanner message={error} variant="danger" />;

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const onItemCountChange = (name: string, value: number) => updateItemCount(name, value, optionType);

  const optionItems = items.map(item => (
    <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} updateItemCount={onItemCountChange} />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>${pricePerItem[optionType].toFixed(2)} each</p>
      <p>
        {title} total: {formatCurrency(orderDetails.totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}

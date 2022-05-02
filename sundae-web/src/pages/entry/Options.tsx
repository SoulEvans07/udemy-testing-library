import { ReactElement, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { serverUrl } from '../../config';
import ScoopOption from './ScoopOption';
import { OptionItem } from './types';

interface OptionsProps {
  optionType: 'scoops' | 'toppings';
}

export default function Options(props: OptionsProps): ReactElement {
  const { optionType } = props;
  const [items, setItems] = useState<OptionItem[]>([]);

  useEffect(() => {
    fetch(serverUrl + '/' + optionType)
      .then(res => res.json())
      .then(options => setItems(options))
      .catch(err => {
        // TODO: handle error response
      });
  }, []);

  // const ItemComponent = optionType === 'scoops' ? ScoopOption : null;
  const ItemComponent = ScoopOption;

  const optionItems = items.map(item => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={function (name: string, value: number): void {
        throw new Error('Function not implemented.');
      }}
    />
  ));

  return <Row>{optionItems}</Row>;
}

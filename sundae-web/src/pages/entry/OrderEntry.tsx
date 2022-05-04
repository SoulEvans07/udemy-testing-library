import { ReactElement } from 'react';
import Options from './Options';

export default function OrderEntry(): ReactElement {
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
    </div>
  );
}

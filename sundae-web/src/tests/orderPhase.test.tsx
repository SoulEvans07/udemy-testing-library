import { render } from '@testing-library/react';
import App from '../App';

describe('OrderPhase', () => {
  test('happy path', () => {
    render(<App />);

    // add ice cream scoops and toppings

    // click order button

    // check summary information based on order

    // accept terms and conditions

    // confirm order

    // confirm order number on the confirm page

    // click "new order"

    // check that order entries page has been reset

    // HINT: do we need to await anything to avoid test errors?
    // such as cant update component after unmounted
  });
});

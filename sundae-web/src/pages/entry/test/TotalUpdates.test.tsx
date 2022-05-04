import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../utils/testing-library-utils';
import { pricePerItem } from '../../../constants';
import { mockScoopOptions } from '../../../mocks/getScoops';
import { formatCurrency } from '../../../utils/currency-utils';
import Options from '../Options';
import { mockToppingOptions } from '../../../mocks/getToppings';
import { Random } from '../../../utils/Random';

describe('TotalUpdates', () => {
  test('update scoop subtotal when scoops change', async () => {
    render(<Options optionType="scoops" />);

    let totalCost = 0;
    const scoopsSubTotal = screen.getByText('Scoops total: $', { exact: false });
    expect(scoopsSubTotal).toHaveTextContent(formatCurrency(totalCost));

    for (let i = 0; i < mockScoopOptions.length; i++) {
      const scoop = mockScoopOptions[i];
      const selectCount = i + 1;
      totalCost += selectCount * pricePerItem.scoops;
      const scoopInput = await screen.findByRole('spinbutton', { name: scoop.name });
      userEvent.clear(scoopInput);
      userEvent.type(scoopInput, String(selectCount));
      expect(scoopsSubTotal).toHaveTextContent(formatCurrency(totalCost));
    }
  });

  test('update toppings subtotal when toppings change', async () => {
    render(<Options optionType="toppings" />);

    const toppingsSubTotal = screen.getByText('Toppings total: $', { exact: false });
    expect(toppingsSubTotal).toHaveTextContent('$0.00');

    for (let i = 0; i < mockToppingOptions.length; i++) {
      const topping = mockToppingOptions[i];
      const toppingCheckbox = await screen.findByRole('checkbox', { name: topping.name });
      userEvent.click(toppingCheckbox);
      expect(toppingsSubTotal).toHaveTextContent(formatCurrency((i + 1) * pricePerItem.toppings));
    }

    const topping = Random.choose(mockToppingOptions);
    const toppingCheckbox = await screen.findByRole('checkbox', { name: topping.name });
    userEvent.click(toppingCheckbox);
    expect(toppingsSubTotal).toHaveTextContent(formatCurrency((mockToppingOptions.length - 1) * pricePerItem.toppings));
  });
});

import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../utils/testing-library-utils';
import { pricePerItem } from '../../../constants';
import { mockScoopOptions } from '../../../mocks/getScoops';
import { formatCurrency } from '../../../utils/currency-utils';
import { mockToppingOptions } from '../../../mocks/getToppings';
import { Random } from '../../../utils/Random';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

describe('TotalUpdates', () => {
  const setScoopTo = async (scoopName: string, count: number) => {
    const scoopInput = await screen.findByRole('spinbutton', { name: scoopName });
    userEvent.clear(scoopInput);
    userEvent.type(scoopInput, String(count));
  };

  const toggleTopping = async (toppingName: string) => {
    const toppingCheckbox = await screen.findByRole('checkbox', { name: toppingName });
    userEvent.click(toppingCheckbox);
  };

  describe('SubTotals', () => {
    test('update scoop subtotal when scoops change', async () => {
      render(<Options optionType="scoops" />);

      let totalCost = 0;
      const scoopsSubTotal = screen.getByText('Scoops total: $', { exact: false });
      expect(scoopsSubTotal).toHaveTextContent(formatCurrency(totalCost));

      for (let i = 0; i < mockScoopOptions.length; i++) {
        const scoop = mockScoopOptions[i];
        const selectCount = i + 1;
        totalCost += selectCount * pricePerItem.scoops;
        await setScoopTo(scoop.name, selectCount);
        expect(scoopsSubTotal).toHaveTextContent(formatCurrency(totalCost));
      }
    });

    test('update toppings subtotal when toppings change', async () => {
      render(<Options optionType="toppings" />);

      const toppingsSubTotal = screen.getByText('Toppings total: $', { exact: false });
      expect(toppingsSubTotal).toHaveTextContent('$0.00');

      for (let i = 0; i < mockToppingOptions.length; i++) {
        const topping = mockToppingOptions[i];
        await toggleTopping(topping.name);
        expect(toppingsSubTotal).toHaveTextContent(formatCurrency((i + 1) * pricePerItem.toppings));
      }

      const topping = Random.choose(mockToppingOptions);
      const toppingCheckbox = await screen.findByRole('checkbox', { name: topping.name });
      userEvent.click(toppingCheckbox);
      expect(toppingsSubTotal).toHaveTextContent(
        formatCurrency((mockToppingOptions.length - 1) * pricePerItem.toppings)
      );
    });
  });

  describe('GrandTotal', () => {
    let grandTotal: HTMLHeadingElement;

    beforeEach(() => {
      render(<OrderEntry />);
      grandTotal = screen.getByRole('heading', { name: /grand total: /i }) as HTMLHeadingElement;
    });

    it('updates properly if we add scoops', async () => {
      expect(grandTotal).toHaveTextContent(formatCurrency(0));

      let totalCost = 0;
      for (let i = 0; i < mockScoopOptions.length; i++) {
        const scoop = mockScoopOptions[i];
        const selectCount = i + 1;
        totalCost += selectCount * pricePerItem.scoops;
        await setScoopTo(scoop.name, selectCount);
        expect(grandTotal).toHaveTextContent(formatCurrency(totalCost));
      }
    });

    it('updates properly if we add toppings', async () => {
      expect(grandTotal).toHaveTextContent(formatCurrency(0));

      let totalCost = 0;
      for (let i = 0; i < mockToppingOptions.length; i++) {
        const topping = mockToppingOptions[i];
        await toggleTopping(topping.name);
        totalCost += pricePerItem.toppings;
        expect(grandTotal).toHaveTextContent(formatCurrency(totalCost));
      }
    });

    it('updates properly if we add both', async () => {
      let totalCost = 0;
      await setScoopTo(mockScoopOptions[0].name, 2);
      totalCost += 2 * pricePerItem.scoops;

      await toggleTopping(mockToppingOptions[0].name);
      await toggleTopping(mockToppingOptions[1].name);
      totalCost += 2 * pricePerItem.toppings;

      expect(grandTotal).toHaveTextContent(formatCurrency(totalCost));
    });

    it('updates properly if we remove any item', async () => {
      let totalCost = 0;

      await setScoopTo(mockScoopOptions[0].name, 2);
      await setScoopTo(mockScoopOptions[1].name, 1);
      totalCost += 3 * pricePerItem.scoops;
      await toggleTopping(mockToppingOptions[0].name);
      await toggleTopping(mockToppingOptions[1].name);
      await toggleTopping(mockToppingOptions[2].name);
      totalCost += 3 * pricePerItem.toppings;
      expect(grandTotal).toHaveTextContent(formatCurrency(totalCost));

      await setScoopTo(mockScoopOptions[0].name, 1);
      totalCost -= pricePerItem.scoops;
      expect(grandTotal).toHaveTextContent(formatCurrency(totalCost));

      await setScoopTo(mockScoopOptions[1].name, 0);
      totalCost -= pricePerItem.scoops;
      expect(grandTotal).toHaveTextContent(formatCurrency(totalCost));

      await toggleTopping(mockToppingOptions[1].name);
      totalCost -= pricePerItem.toppings;
      expect(grandTotal).toHaveTextContent(formatCurrency(totalCost));
    });
  });
});

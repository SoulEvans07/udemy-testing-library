import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { pricePerItem } from '../constants';
import { mockScoopOptions } from '../mocks/getScoops';
import { mockToppingOptions } from '../mocks/getToppings';
import { mockOrderNumber } from '../mocks/postOrder';
import { setScoopTo, toggleTopping } from '../pages/entry/test/helpers';
import { formatCurrency } from '../utils/currency-utils';
import { Random } from '../utils/Random';

describe('OrderPhase', () => {
  test('happy path', async () => {
    render(<App />);

    // add ice cream scoops and toppings
    let scoopCost = 0;
    let toppingsCost = 0;
    let totalCost = 0;
    const scoops = Random.choose(mockScoopOptions, 1 + Random.number(mockScoopOptions.length - 1));
    const scoopsOrdered = scoops.map(scoop => ({ scoop, amount: 1 + Random.number(2) }));
    for await (const { scoop, amount } of scoopsOrdered) {
      await setScoopTo(scoop.name, amount);
      const cost = amount * pricePerItem.scoops;
      scoopCost += cost;
      totalCost += cost;
    }

    const toppingsOrdered = Random.choose(mockToppingOptions, 1 + Random.number(mockToppingOptions.length - 1));
    for await (const topping of toppingsOrdered) {
      await toggleTopping(topping.name);
      toppingsCost += pricePerItem.toppings;
      totalCost += pricePerItem.toppings;
    }

    // click order button
    const orderButton = screen.getByRole('button', { name: /order/i });
    await waitFor(() => expect(orderButton).toBeEnabled());
    userEvent.click(orderButton);

    // are we on the order summary page?
    const summaryHeading = screen.getByRole('heading', { name: /order summary/i });
    expect(summaryHeading).toBeInTheDocument();

    // check summary information based on order
    scoopsOrdered.forEach(order => {
      const orderListItem = screen.getByText(`${order.amount} ${order.scoop.name}`);
      expect(orderListItem).toBeInTheDocument();
    });

    toppingsOrdered.forEach(order => {
      const orderListItem = screen.getByText(order.name);
      expect(orderListItem).toBeInTheDocument();
    });

    // check summary totals
    const scoopsSubTotal = screen.getByText('Scoops:', { exact: false });
    expect(scoopsSubTotal).toHaveTextContent(formatCurrency(scoopCost));

    const toppingsSubTotal = screen.getByText('Toppings:', { exact: false });
    expect(toppingsSubTotal).toHaveTextContent(formatCurrency(toppingsCost));

    const grandTotal = screen.getByText('Grand Total:', { exact: false });
    expect(grandTotal).toHaveTextContent(formatCurrency(totalCost));

    // accept terms and conditions
    const termsCheckbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    userEvent.click(termsCheckbox);

    // confirm order
    const confirmButton = screen.getByRole('button', { name: /order/i });
    userEvent.click(confirmButton);

    // expect loading
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();

    // are we on the order thank you page?
    const thankYouHeading = await screen.findByRole('heading', { name: /thank you/i });
    expect(thankYouHeading).toBeInTheDocument();

    // expect that loading has disappeared
    const notLoading = screen.queryByText('loading');
    expect(notLoading).not.toBeInTheDocument();

    // confirm order number on the confirm page
    const orderNumber = await screen.findByText('order number', { exact: false });
    expect(orderNumber).toHaveTextContent(String(mockOrderNumber));

    // click "new order"
    const newOrderButton = screen.getByRole('button', { name: /new order/i });
    userEvent.click(newOrderButton);

    // check that order entries page has been reset
    const scoopsTotal = screen.getByText('Scoops total:', { exact: false });
    expect(scoopsTotal).toHaveTextContent(formatCurrency(0));
    const toppingsTotal = screen.getByText('Scoops total:', { exact: false });
    expect(toppingsTotal).toHaveTextContent(formatCurrency(0));

    // HINT: do we need to await anything to avoid test errors?
    // such as cant update component after unmounted
    // ANSWER: wait for items to appear so that Testing Library doesn't get angry
    // about stuff happening after test is over
    await screen.findByRole('spinbutton', { name: mockScoopOptions[0].name });
    await screen.findByRole('checkbox', { name: mockToppingOptions[0].name });
  });
});

import { render, screen, waitFor } from '../../../utils/testing-library-utils';
import { createEmptyGetHandler } from '../../../mocks/helpers';
import { server } from '../../../mocks/server';
import OrderEntry from '../OrderEntry';
import { setScoopTo, toggleTopping } from './helpers';
import { Random } from '../../../utils/Random';
import { mockToppingOptions } from '../../../mocks/getToppings';
import { mockScoopOptions } from '../../../mocks/getScoops';

describe('OrderEntry', () => {
  it('handles errors from scoops and toppings routes', async () => {
    server.resetHandlers(createEmptyGetHandler('/scoops', 500), createEmptyGetHandler('/toppings', 500));

    render(<OrderEntry setOrderPhase={jest.fn} />);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert');
      expect(alerts).toHaveLength(2);

      // the 'alert' role does not consider text content as 'accessible text'
      // so the usual { name: /^Error/i } selector wont work
      expect(alerts[0]).toHaveTextContent(/^Error: /i);
      expect(alerts[1]).toHaveTextContent(/^Error: /i);
    });
  });

  test('order button should be disabled until no scoops are selected', async () => {
    render(<OrderEntry setOrderPhase={jest.fn} />);

    const orderButton = screen.getByRole('button', { name: /order/i });
    expect(orderButton).toBeDisabled();

    const topping = Random.choose(mockToppingOptions);
    toggleTopping(topping.name);
    expect(orderButton).toBeDisabled();

    const scoop = Random.choose(mockScoopOptions);
    await setScoopTo(scoop.name, 1);
    expect(orderButton).toBeEnabled();

    await setScoopTo(scoop.name, 0);
    expect(orderButton).toBeDisabled();
  });
});

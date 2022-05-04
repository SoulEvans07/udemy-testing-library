import { render, screen, waitFor } from '@testing-library/react';
import { createEmptyGetHandler } from '../../../mocks/helpers';
import { server } from '../../../mocks/server';
import OrderEntry from '../OrderEntry';

describe('OrderEntry', () => {
  it('handles errors from scoops and toppings routes', async () => {
    server.resetHandlers(createEmptyGetHandler('/scoops', 500), createEmptyGetHandler('/toppings', 500));

    render(<OrderEntry />);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert');
      expect(alerts).toHaveLength(2);

      // the 'alert' role does not consider text content as 'accessible text'
      // so the usual { name: /^Error/i } selector wont work
      expect(alerts[0]).toHaveTextContent(/^Error: /i);
      expect(alerts[1]).toHaveTextContent(/^Error: /i);
    });
  });
});

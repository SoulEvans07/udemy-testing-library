import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../utils/testing-library-utils';
import { pricePerItem } from '../../../constants';
import { mockScoopOptions } from '../../../mocks/getScoops';
import { formatCurrency } from '../../../utils/currency-utils';
import Options from '../Options';

describe('TotalUpdates', () => {
  test('update scoop subtotal when scoops change', async () => {
    render(<Options optionType="scoops" />);

    const scoopsSubTotal = screen.getByText('Scoops total: $', { exact: false });
    expect(scoopsSubTotal).toHaveTextContent('$0.00');

    const firstScoopCount = 1;
    const firstScoopCost = firstScoopCount * pricePerItem.scoops;
    const firstScoop = await screen.findByRole('spinbutton', { name: mockScoopOptions[0].name });
    userEvent.clear(firstScoop);
    userEvent.type(firstScoop, String(firstScoopCount));
    expect(scoopsSubTotal).toHaveTextContent(formatCurrency(firstScoopCost));

    const secondScoopCount = 2;
    const secondScoopCost = secondScoopCount * pricePerItem.scoops;
    const secondScoop = await screen.findByRole('spinbutton', { name: mockScoopOptions[1].name });
    userEvent.clear(secondScoop);
    userEvent.type(secondScoop, String(secondScoopCount));
    expect(scoopsSubTotal).toHaveTextContent(formatCurrency(firstScoopCost + secondScoopCost));
  });
});

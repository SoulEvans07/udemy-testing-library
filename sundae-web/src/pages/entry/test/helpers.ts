import { screen } from '../../../utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

export const setScoopTo = async (scoopName: string, count: number) => {
  const scoopInput = await screen.findByRole('spinbutton', { name: scoopName });
  userEvent.clear(scoopInput);
  userEvent.type(scoopInput, String(count));
};

export const toggleTopping = async (toppingName: string) => {
  const toppingCheckbox = await screen.findByRole('checkbox', { name: toppingName });
  userEvent.click(toppingCheckbox);
};

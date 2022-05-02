import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

describe('SummaryForm', () => {
  let termsCheckbox: HTMLInputElement;
  let confirmButton: HTMLButtonElement;

  beforeEach(async () => {
    render(<SummaryForm />);
    termsCheckbox = (await screen.findByRole('checkbox', { name: /terms and conditions/i })) as HTMLInputElement;
    confirmButton = (await screen.findByRole('button', { name: /confirm order/i })) as HTMLButtonElement;
  });

  test('initial conditions', () => {
    expect(termsCheckbox).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
    expect(termsCheckbox).not.toBeChecked();
    expect(confirmButton).toBeDisabled();
  });

  test('checkbox enables button when checked, disables when unchecked', () => {
    fireEvent.click(termsCheckbox);
    expect(termsCheckbox).toBeChecked();
    expect(confirmButton).toBeEnabled();

    fireEvent.click(termsCheckbox);
    expect(termsCheckbox).not.toBeChecked();
    expect(confirmButton).toBeDisabled();
  });

  test('terms and conditions popover responds to hover', async () => {
    const popoverRegEx = /no ice cream will actually be delivered/i;
    const nullPopover = screen.queryByText(popoverRegEx);
    expect(nullPopover).not.toBeInTheDocument();

    const termsLabel = screen.getByText(/terms and conditions/i);
    fireEvent.mouseOver(termsLabel);

    const popover = screen.getByText(popoverRegEx);
    expect(popover).toBeInTheDocument();

    fireEvent.mouseOut(termsLabel);
    await waitForElementToBeRemoved(() => screen.queryByText(popoverRegEx));
  });
});

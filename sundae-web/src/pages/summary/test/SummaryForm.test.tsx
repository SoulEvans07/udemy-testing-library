import { fireEvent, render, screen } from '@testing-library/react';
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
});

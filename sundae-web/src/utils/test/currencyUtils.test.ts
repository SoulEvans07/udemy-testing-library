import { formatCurrency } from '../currency-utils';

describe('currency utils', () => {
  it('always has 2 decimal places for integers', () => {
    expect(formatCurrency(50)).toBe('$50.00');
    expect(formatCurrency(-10)).toBe('-$10.00');
    expect(formatCurrency(0)).toBe('$0.00');
    expect(formatCurrency(-0)).toBe('-$0.00');
  });

  it('always has 2 decimal places for only one decimal place', () => {
    expect(formatCurrency(50.1)).toBe('$50.10');
    expect(formatCurrency(-10.2)).toBe('-$10.20');
    expect(formatCurrency(0.3)).toBe('$0.30');
    expect(formatCurrency(-0.4)).toBe('-$0.40');
  });

  it('rounds off decimals if it has more than 2', () => {
    expect(formatCurrency(50.001)).toBe('$50.00');
    expect(formatCurrency(-10.004)).toBe('-$10.00');
    expect(formatCurrency(0.0045)).toBe('$0.00');
    expect(formatCurrency(0.005)).toBe('$0.01');
    expect(formatCurrency(-0.008)).toBe('-$0.01');
  });
});

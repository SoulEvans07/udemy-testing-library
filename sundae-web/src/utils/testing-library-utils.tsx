import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { OrderDetailsProvider } from '../contexts/OrderDetails';

const renderWithcontext = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

export * from '@testing-library/react';
export { renderWithcontext as render };

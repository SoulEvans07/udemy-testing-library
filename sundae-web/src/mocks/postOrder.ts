import { rest } from 'msw';
import { serverUrl } from '../config';

export const mockOrderNumber = 123455676;

interface OrderResponse {
  orderNumber: number;
}

export const postOrder = rest.post<{}, {}, OrderResponse>(serverUrl + '/order', (_, res, ctx) => {
  return res(ctx.json<OrderResponse>({ orderNumber: mockOrderNumber }));
});

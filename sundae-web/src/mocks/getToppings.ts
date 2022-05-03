import { rest } from 'msw';
import { serverUrl } from '../config';

export interface IceCreamTopping {
  name: string;
  imagePath: string;
}

export const mockToppingOptions: IceCreamTopping[] = [
  { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
  { name: 'Cherries', imagePath: '/images/cherries.png' },
  { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' },
];

export const mockToppingImgAlts = mockToppingOptions.map(scoop => scoop.name + ' topping');

export const getToppings = rest.get<{}, {}, IceCreamTopping[]>(serverUrl + '/toppings', (_, res, ctx) => {
  return res(ctx.json<IceCreamTopping[]>(mockToppingOptions));
});

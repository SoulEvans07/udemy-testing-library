import { MockedRestHandler } from './types';

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

export const getToppings: MockedRestHandler<IceCreamTopping[]> = (req, res, ctx) => {
  return res(ctx.json<IceCreamTopping[]>(mockToppingOptions));
};

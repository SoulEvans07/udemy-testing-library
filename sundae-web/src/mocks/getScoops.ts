import { MockedRestHandler } from './types';

export interface IceCreamFlavor {
  name: string;
  imagePath: string;
}

export const mockScoopOptions: IceCreamFlavor[] = [
  { name: 'Chocolate', imagePath: '/images/chocolate.png' },
  { name: 'Vanilla', imagePath: '/images/vanilla.png' },
];

export const mockScoopImgAlts = mockScoopOptions.map(scoop => scoop.name + ' scoop');

export const getScoops: MockedRestHandler<IceCreamFlavor[]> = (req, res, ctx) => {
  return res(ctx.json<IceCreamFlavor[]>(mockScoopOptions));
};

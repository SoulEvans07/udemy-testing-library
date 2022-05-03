import { rest } from 'msw';
import { serverUrl } from '../config';

export interface IceCreamFlavor {
  name: string;
  imagePath: string;
}

export const mockScoopOptions: IceCreamFlavor[] = [
  { name: 'Chocolate', imagePath: '/images/chocolate.png' },
  { name: 'Vanilla', imagePath: '/images/vanilla.png' },
];

export const mockScoopImgAlts = mockScoopOptions.map(scoop => scoop.name + ' scoop');

export const getScoops = rest.get<{}, {}, IceCreamFlavor[]>(serverUrl + '/scoops', (_, res, ctx) => {
  return res(ctx.json<IceCreamFlavor[]>(mockScoopOptions));
});

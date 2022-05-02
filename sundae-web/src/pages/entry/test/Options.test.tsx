import { render, screen } from '@testing-library/react';
import { mockScoopOptions, mockScoopImgAlts } from '../../../mocks/getScoops';
import { mockToppingImgAlts, mockToppingOptions } from '../../../mocks/getToppings';
import Options from '../Options';

describe('Options', () => {
  it('displays an image for each scoop option given by the server', async () => {
    render(<Options optionType="scoops" />);

    const scoopImages = (await screen.findAllByRole('img', { name: /scoop$/i })) as HTMLImageElement[];
    expect(scoopImages).toHaveLength(mockScoopOptions.length);

    const altText = scoopImages.map(element => element.alt);
    expect(altText).toStrictEqual(mockScoopImgAlts);
  });

  it('displays an image for each toppings option given by the server', async () => {
    render(<Options optionType="toppings" />);

    const toppingsImages = (await screen.findAllByRole('img', { name: /topping$/i })) as HTMLImageElement[];
    expect(toppingsImages).toHaveLength(mockToppingOptions.length);

    const altText = toppingsImages.map(element => element.alt);
    expect(altText).toStrictEqual(mockToppingImgAlts);
  });
});

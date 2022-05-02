import { render, screen } from '@testing-library/react';
import { mockScoopOptions, mockImgAlts } from '../../../mocks/getScoops';
import Options from '../Options';

describe('Options', () => {
  it('displays an image for each scoop option given by the server', async () => {
    render(<Options optionType="scoops" />);

    const scoopImages = (await screen.findAllByRole('img', { name: /scoop$/i })) as HTMLImageElement[];
    expect(scoopImages).toHaveLength(mockScoopOptions.length);

    const altText = scoopImages.map(element => element.alt);
    expect(altText).toEqual(mockImgAlts);
  });
});

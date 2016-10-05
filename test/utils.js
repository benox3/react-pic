import { expect } from 'chai';
import getResponsiveImage from '../lib/utils/getResponsiveImage';

describe('Utils', function() {
  const images= [
    {
      width: 40,
      url: 'http://placehold.it/40?text=♥'
    },
    {
      width: 290,
      url: 'http://placehold.it/290?text=♥'
    },
    {
      width: 320,
      url: 'http://placehold.it/320?text=♥'
    }
  ];

  it('should select the correct image in images', function() {
    expect(getResponsiveImage('40', images, images[0])).to.equal(images[0]);
    expect(getResponsiveImage('290', images, images[0])).to.equal(images[1]);
    expect(getResponsiveImage('200', images, images[0])).to.equal(images[1]);
    expect(getResponsiveImage('320', images, images[0])).to.equal(images[2]);
    expect(getResponsiveImage('40', images, images[2])).to.equal(images[2]);
  });

  it(`should never select a smaller image than one that is
      already loaded`, function() {
    expect(getResponsiveImage('40', images, images[2])).to.equal(images[2]);
    expect(getResponsiveImage('290', images, images[2])).to.equal(images[2]);
  });
});

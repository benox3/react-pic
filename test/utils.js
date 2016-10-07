import { expect } from 'chai';
import getResponsiveImage from '../lib/utils/getResponsiveImage';
import debounce from '../lib/utils/debounce';

describe('Utils', function() {
  describe('getResponsiveImage', function() {
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

  describe('debounce', function() {
    it('debounces correctly', function(done) {
      let counter = 0;

      const increment = function () {
        return counter++;
      };

      let debouncedIncr = debounce(increment, 15);

      debouncedIncr();
      debouncedIncr();

      setTimeout(function() {
        expect(counter).to.equal(1);
        done();
      }, 100);

    });
  });
});

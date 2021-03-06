import React from 'react';

import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import ImageWrapper from '../ImageWrapper';
import Image from '../../common/Image';

describe('ImageWrapper', () => {
  const props = {
    alt: 'heart',
    noscriptImage: {
      width: 290,
      url: 'http://placehold.it/290?text=♥',
    },
    image: {
      width: 290,
      url: 'http://placehold.it/290?text=♥',
    },
    imgStyle: {
      margin: 0
    },
    isBlurred: false,
    blurAmount: 0
  };

  describe('rendering', () => {
    it('should render', () => {
      expect(
        mount(<ImageWrapper {...props} />).html()
      ).to.not.equal(null);
    });
    it('should render a Image component', () => {
      expect(
        mount(<ImageWrapper {...props} />).find(Image).exists()
      ).to.be.true;
    });
  });

  describe('snapshots', () => {
    it('should get match the standard snapshot', () => {
      expect(
        renderer.create(<ImageWrapper {...props} />).toJSON()
      ).toMatchSnapshot();
    });
  });
});

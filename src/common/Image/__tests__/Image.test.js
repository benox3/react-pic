import React from 'react';

import { mount } from 'enzyme';

import Image from '../Image';

describe('Image', () => {
  const image = { url: 'http://placehold.it/290?text=♥', width: 290 };
  const imgStyle = { margin: '0 auto', maxWidth: '100%', width: '100%' };

  describe('rendering', () => {
    it('should render', () => {
        expect(mount(
          <Image 
            image={image} 
            alt="" 
            imgStyle={imgStyle} 
            isBlurred 
            blurAmount={30} 
          />
        ).html()).to.not.equal(null);
    });

    it('should render a standard img element', () => {
      expect(mount(
          <Image 
            image={image} 
            alt="" 
            imgStyle={imgStyle} 
            isBlurred 
            blurAmount={30} 
          />
        ).find('img').html()).to.not.equal(null);
    });
  });

  describe('snapshots', () => {
    it('should match standard snapshot', () => {
      expect(mount(
        <Image 
          image={image} 
          alt="" 
          imgStyle={imgStyle} 
          isBlurred 
          blurAmount={30} 
        />
      )).toMatchSnapshot();
    });
  });
});

import { expect } from 'chai';
import React from 'react';
import { mount, render } from 'enzyme';

import getResponsiveImage from '../src/utils/getResponsiveImage';
import isElementInView from '../src/utils/isElementInView';
import convertReactToHTMLStyle from '../src/utils/convertReactToHTMLStyle';

describe('Utils', () => {
  describe('getResponsiveImage', () => {
    const images = [
      {
        width: 40,
        url: 'http://placehold.it/40?text=♥',
      },
      {
        width: 290,
        url: 'http://placehold.it/290?text=♥',
      },
      {
        width: 320,
        url: 'http://placehold.it/320?text=♥',
      },
    ];

    it('should select the correct image in images', () => {
      expect(getResponsiveImage(40, images, images[0])).to.equal(images[0]);
      expect(getResponsiveImage(290, images, images[0])).to.equal(images[1]);
      expect(getResponsiveImage(200, images, images[0])).to.equal(images[1]);
      expect(getResponsiveImage(320, images, images[0])).to.equal(images[2]);
    });

    it(`should never select a smaller image than one that is
        already loaded`, () => {
      expect(getResponsiveImage(40, images, images[2])).to.equal(images[2]);
      expect(getResponsiveImage(290, images, images[2])).to.equal(images[2]);
    });
  });

  describe('isElementInView', () => {
    afterEach(() => {
      window.HTMLDivElement.prototype.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      });
    });

    it('should return true when element is in view', () => {
      const wrapper = mount(<div />);

      window.HTMLDivElement.prototype.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        right: 250,
        bottom: 250,
      });
      expect(isElementInView(wrapper.find('div').get(0))).to.equal(true);
    });

    it('should return false when element is not in view', () => {
      const wrapper = mount(<div />);

      window.HTMLDivElement.prototype.getBoundingClientRect = () => ({
        left: 0,
        top: 10000,
        right: 250,
        bottom: 250,
      });

      expect(isElementInView(wrapper.find('div').get(0))).to.equal(false);
    });
  });

  describe('convertReactToHTMLStyle', () => {
    it('converts vendor prefixes correctly', () => {
      const style = {
        WebkitTransition: 'all',
        msTransition: 'all',
        MozTransition: 'all',
        OTransition: 'all',
      };
      const wrapper = render(<div style={style} />);

      expect(convertReactToHTMLStyle(style)).to.equal(
        wrapper.find('div').attr('style'),
      );
    });

    it('converts single style correctly', () => {
      const style = {
        display: 'none',
      };
      const wrapper = render(<div style={style} />);

      expect(convertReactToHTMLStyle(style)).to.equal(
        wrapper.find('div').attr('style'),
      );
    });

    it('converts multiple styles correctly', () => {
      const style = {
        display: 'none',
        visibility: 'hidden',
      };
      const wrapper = render(<div style={style} />);

      expect(convertReactToHTMLStyle(style)).to.equal(
        wrapper.find('div').attr('style'),
      );
    });

    it('converts empty style correctly', () => {
      const style = {};
      const wrapper = render(<div style={style} />);

      expect(convertReactToHTMLStyle(style)).to.equal(
        wrapper.find('div').attr('style') || '',
      );
    });
  });
});

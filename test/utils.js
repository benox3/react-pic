import { expect } from 'chai';
import getResponsiveImage from '../lib/utils/getResponsiveImage';
import debounce from '../lib/utils/debounce';
import isElementInView from '../lib/utils/isElementInView';
import convertReactToHTMLStyle from '../lib/utils/convertReactToHTMLStyle';
import React from 'react';
import ReactDOM from 'react-dom';
import { mount, render } from 'enzyme';

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

  describe('isElementInView', function() {
    afterEach(function(){
      window.HTMLDivElement.prototype.getBoundingClientRect = function() {
        return {
          left : 0,
          top :  0,
          right : 0,
          bottom : 0
        };
      };
    });

    it('should return true when element is in view', function() {
      const wrapper = mount(
        <div />
      );

      window.HTMLDivElement.prototype.getBoundingClientRect = function() {
        return {
          left : 0,
          top :  0,
          right : 250,
          bottom : 250
        };
      };

      expect(isElementInView(ReactDOM.findDOMNode(wrapper.instance()))).to.equal(true);
    });

    it('should return false when element is not in view', function() {
      const wrapper = mount(
        <div />
      );

      window.HTMLDivElement.prototype.getBoundingClientRect = function() {
        return {
          left : 0,
          top :  10000,
          right : 250,
          bottom : 250
        };
      };

      expect(isElementInView(ReactDOM.findDOMNode(wrapper.instance()))).to.equal(false);
    });
  });

  describe('convertReactToHTMLStyle', function() {
    it('converts vendor prefixes correctly', function() {
      const style = {
        WebkitTransition: 'all',
        msTransition: 'all',
        MozTransition: 'all',
        OTransition: 'all'
      };
      const wrapper = render(
        <div style={style}></div>
      );

      expect(
        convertReactToHTMLStyle(style)
      ).to.equal(
        wrapper.find('div').attr('style')
      );
    });

    it('converts single style correctly', function() {
      const style = {
        display: 'none'
      };
      const wrapper = render(
        <div style={style}></div>
      );

      expect(
        convertReactToHTMLStyle(style)
      ).to.equal(
        wrapper.find('div').attr('style')
      );
    });

    it('converts multiple styles correctly', function() {
      const style = {
        display: 'none',
        visibility: 'hidden'
      };
      const wrapper = render(
        <div style={style}></div>
      );

      expect(
        convertReactToHTMLStyle(style)
      ).to.equal(
        wrapper.find('div').attr('style')
      );
    });

    it('converts empty style correctly', function() {
      const style = {};
      const wrapper = render(
        <div style={style}></div>
      );

      expect(
        convertReactToHTMLStyle(style)
      ).to.equal(
        wrapper.find('div').attr('style') || ''
      );
    });
  });
});

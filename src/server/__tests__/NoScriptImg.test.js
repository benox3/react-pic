import React from 'react';

import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import NoScriptImg from '../NoScriptImg';

describe('NoScriptImg', () => {
  const props = {
    alt: 'heart',
    image: {
      width: 290,
      url: 'http://placehold.it/290?text=♥',
    },
    style: {
      margin: 0
    }
  };

  describe('rendering', () => {
    it('should render', () => {
      expect(mount(<NoScriptImg {...props} />).html()).to.not.equal(null);
    });

    it('should render a noscript tag', () => {
      expect(
        mount(<NoScriptImg {...props} />).find('noscript').exists()
      ).to.be.true;
    });
  });

  describe('snapshots', () => {
    it('should match base snapshot', () => {
      expect(renderer.create(<NoScriptImg {...props} />)).toMatchSnapshot();
    });
  });
});
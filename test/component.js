import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Pic from '../lib/';

describe('Pic', function() {
  it('should render the first image in images', function() {
    const props = {
      images: [
        {
          width: 290,
          url: 'http://placehold.it/290?text=♥'
        },
        {
          width: 320,
          url: 'http://placehold.it/320?text=♥'
        }
      ]
    };

    const pic = shallow(
      <Pic { ...props } />
    );

    expect(pic.contains(
      <img
        style={pic.props().style}
        src={props.images[0].url} />
    )).to.equal(true);
  });

  it('should render the second image in images', function() {
    const props = {
      defaultIndex: 1,
      images: [
        {
          width: 290,
          url: 'http://placehold.it/290?text=♥'
        },
        {
          width: 320,
          url: 'http://placehold.it/320?text=♥'
        }
      ]
    };

    const pic = shallow(
      <Pic { ...props } />
    );

    expect(pic.contains(
      <img
        style={pic.props().style}
        src={props.images[1].url} />
    )).to.equal(true);
  });
});

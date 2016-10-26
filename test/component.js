import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Pic from '../lib/';
import { spy } from 'sinon';

describe('Pic', function() {
  it('should render the first image in images', function() {
    const props = {
      alt: 'heart',
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

    const pic = mount(
      <Pic { ...props } />
    );

    expect(pic.containsMatchingElement(
      <img
        alt={props.alt}
        src={props.images[0].url} />
    )).to.equal(true);
  });

  it('should render the second image in images', function() {
    const props = {
      alt: 'heart',
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

    const pic = mount(
      <Pic { ...props } />
    );

    expect(pic.containsMatchingElement(
      <img
        alt={props.alt}
        src={props.images[1].url} />
    )).to.equal(true);
  });

  it('should render the last image in noscript', function() {
    const props = {
      alt: 'heart',
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

    const pic = render(
      <Pic { ...props } />
    );

    expect(pic.find('noscript img').length).to.equal(1);
    expect(pic.find('noscript img').attr('src')).to.equal(props.images[1].url);
  });

  it('should not render image if props are not passed', function() {

    const pic = shallow(
      <Pic />
    );

    expect(pic.find('img')).to.have.length(0);
  });

  it('should check if image is in view once mounted', function() {
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

    spy(Pic.prototype, 'inViewHandler');
    mount(<Pic { ...props } />);

    expect(Pic.prototype.inViewHandler.callCount).to.equal(1);
  });

  it('should call componentWillUnmount when unmounted', function() {
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

    spy(Pic.prototype, 'componentWillUnmount');
    const wrapper = mount(<Pic { ...props } />);
    wrapper.unmount();
    expect(Pic.prototype.componentWillUnmount.callCount).to.equal(1);
  });

  it('should set optimal image if renderOutOfView is true', function() {
    const props = {
      renderOutOfView: true,
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

    spy(Pic.prototype, 'setResponsiveImage');
    mount(<Pic { ...props } />);

    expect(Pic.prototype.setResponsiveImage.callCount).to.equal(1);
  });

  it('should set blur to false by default', function() {
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
    const pic = render(
      <Pic { ...props } />
    );

    expect(
      pic.find('img').last().attr('style')
    ).to.not.contain('blur');
  });

  it('should set blur style based if shouldBlur prop is true', function() {
    const props = {
      shouldBlur: true,
      blurAmmount: '10px',
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
    const pic = render(
      <Pic { ...props } />
    );

    expect(
      pic.find('img').last().attr('style')
    ).to.contain(`blur(${props.blurAmmount});`);
  });

  it('should set blur style based on blurAmmount prop', function() {
    const props = {
      shouldBlur: true,
      blurAmmount: '20px',
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
    const pic = render(
      <Pic { ...props } />
    );

    expect(
      pic.find('img').last().attr('style')
    ).to.contain(`blur(${props.blurAmmount});`);
  });

  it('should override img style if imgStyle prop is set', function() {
    const props = {
      imgStyle: {
        backgroundColor: 'red'
      },
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
    const pic = render(
      <Pic { ...props } />
    );

    expect(
      pic.find('img').last().attr('style')
    ).to.contain(`background-color:${props.imgStyle.backgroundColor};`);
  });

  it('should override container style if baseStyle prop is set', function() {
    const props = {
      baseStyle: {
        backgroundColor: 'red'
      },
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
    const pic = render(
      <Pic { ...props } />
    );

    expect(
      pic.find('div').first().attr('style')
    ).to.contain(`background-color:${props.baseStyle.backgroundColor};`);
  });
});

import React, { Component, PropTypes } from 'react';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

import getResponsiveImage from '../utils/getResponsiveImage';
import isElementInView from '../utils/isElementInView';
import ImageWrapper from '../server/index';

/**
 * Pic Component
 */
export default class Pic extends Component {
  /** Prop Types */
  static propTypes = {
    // The collection of images
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
    defaultIndex: PropTypes.number, // The default image to render
    noscriptIndex: PropTypes.number, // The default image to render on noscript
    baseStyle: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ),
    shouldBlur: PropTypes.bool,
    renderOutOfView: PropTypes.bool,
  };

  /** Default Props */
  static defaultProps = {
    alt: '',
    defaultIndex: 0,
    shouldBlur: false,
    blurAmount: '20px',
    baseStyle: {
      position: 'relative',
      overflow: 'hidden',
    },
    imgStyle: {
      margin: '0 auto',
      maxWidth: '100%',
      width: '100%',
    },
    images: [],
    noscriptIndex: 0,
    renderOutOfView: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      image: props.images[props.defaultIndex],
      noscriptImage: props.noscriptIndex ?
        props.images[props.noscriptIndex] :
        props.images[props.images.length - 1],
      isBlurred: props.shouldBlur,
    };
    this.setPicRef = this.setPicRef.bind(this);
    this.setResponsiveImage = this.setResponsiveImage.bind(this);
    this.inViewHandler = this.inViewHandler.bind(this);

    // inViewHandlers
    this.inViewHandler = this.inViewHandler.bind(this);
    this.debouncedInViewHandler = debounce(this.inViewHandler, 150);
    this.throttledInViewHandler = throttle(this.inViewHandler, 150);
  }

  componentDidMount() {
    this.inViewHandler();

    // set responsive image on scroll
    window.addEventListener('scroll', this.throttledInViewHandler);

    // set responsive image on resize
    window.addEventListener('resize', this.debouncedInViewHandler);
  }

  componentWillUnmount() {
    this.throttledInViewHandler.cancel();
    this.debouncedInViewHandler.cancel();
    window.removeEventListener('scroll', this.throttledInViewHandler);
    window.removeEventListener('resize', this.debouncedInViewHandler);
  }

  setPicRef(node) {
    this.picRef = node;
  }

  /**
   * Set the optimal image src
   */
  setResponsiveImage() {
    try {
      const parent = this.picRef.parentNode;
      const imageSlotWidth = parent.getBoundingClientRect().width;

      const responsiveImage = getResponsiveImage(
        imageSlotWidth,
        this.props.images,
        this.state.image,
      );
      this.setState({
        image: responsiveImage,
        isBlurred: false,
      });
    } catch (e) {
      // failed to update image
    }
  }

  /**
   * Sets responsive image if the element is in view
   */
  inViewHandler() {
    if (this.props.renderOutOfView || isElementInView(this.picRef)) {
      this.setResponsiveImage();
    }
  }

  render() {
    if (!this.state.image) {
      return null;
    }

    return (
      <div ref={this.setPicRef} style={this.props.baseStyle} onLoad={this.inViewHandler}>
        <ImageWrapper {...this.props} {...this.state} />
      </div>
    );
  }
}

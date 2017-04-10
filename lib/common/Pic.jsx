import React, { Component, PropTypes } from 'react';
import getResponsiveImage from '../utils/getResponsiveImage';
import debounce from '../utils/debounce';
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
    alt: PropTypes.string,
    imgStyle: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ),
    baseStyle: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ),
    shouldBlur: PropTypes.bool,
    blurAmount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
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
      noScriptImage: props.noscriptIndex ?
        props.images[props.noScriptIndex] :
        props.images[props.images.length-1],
      isBlurred: props.shouldBlur
    };

    this.setResponsiveImage = this.setResponsiveImage.bind(this);
    this.inViewHandler = this.inViewHandler.bind(this);

    // calls inViewHandler with a debounce
    this.debouncedInViewHandler = debounce(this.inViewHandler.bind(this), 150);
  }

  componentDidMount() {
    this.inViewHandler();

    // set responsive image on scroll
    window.addEventListener('scroll', this.debouncedInViewHandler);

    // set responsive image on resize
    window.addEventListener('resize', this.debouncedInViewHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.debouncedInViewHandler);
    window.removeEventListener('resize', this.debouncedInViewHandler);
  }

  /**
   * Sets responsive image if the element is in view
   */
  inViewHandler() {
    if (this.props.renderOutOfView || isElementInView(this.refs.base)) {
      this.setResponsiveImage();
    }
  }

  /**
   * Set the optimal image src
   */
  setResponsiveImage() {
    try {
      const parent = this.refs.base.parentNode;
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

  render() {
    if (!this.state.image) {
      return null;
    }

    return (
      <div ref="base" style={this.props.baseStyle} onLoad={this.inViewHandler}>
        <ImageWrapper {...this.props} {...this.state} />
      </div>
    );
  }
}

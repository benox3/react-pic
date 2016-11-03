import React, { Component } from 'react';
import getResponsiveImage from '../utils/getResponsiveImage';
import debounce from '../utils/debounce';
import isElementInView from '../utils/isElementInView';
import ImageBase from '../server/index';

/**
 * Pic Component
 */
export default class Pic extends Component {
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
    this.loadHandler = this.loadHandler.bind(this);

    // calls inViewHandler with a debounce
    this.debouncedInViewHandler = debounce(this.inViewHandler.bind(this), 150);

  }
  componentDidMount() {
    this.loadHandler();

    // set responsive image on scroll
    window.addEventListener('scroll', this.debouncedInViewHandler);

    // set responsive image on resize
    window.addEventListener('resize', this.debouncedInViewHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.debouncedInViewHandler);
    window.removeEventListener('resize', this.debouncedInViewHandler);
  }

  loadHandler() {
    // set optimal image if in view or if elected to render out of view on mount
    this.props.renderOutOfView ? this.setResponsiveImage() : this.inViewHandler();
  }

  inViewHandler() {
    if (isElementInView(this.refs.base)) {
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
        this.state.image
      );
      this.setState({
        image: responsiveImage,
        isBlurred: false
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
      <div ref='base' style={this.props.baseStyle} onLoad={this.loadHandler}>
        <ImageBase {...this.props} {...this.state} />
      </div>
    );
  }
}

/** Default Props */
Pic.defaultProps = {
  alt: '',
  defaultIndex: 0,
  shouldBlur: false,
  blurAmmount: '20px',
  baseStyle: {
    position: 'relative',
    overflow: 'hidden'
  },
  imgStyle: {
    margin: '0 auto',
    maxWidth: '100%',
    width: '100%'
  },
  images: [],
  renderOutOfView: false
};

/** Prop Types */
Pic.propTypes = {
  // The collection of images
  images: function(props, propName, componentName) {
    const collectionLength = props[propName].length;
    if (collectionLength <= 0) {
      return new Error(
        'No images are found in `' + propName + '` supplied to ' +
        componentName + '. Validation failed.'
      );
    }
    for (let i = 0; i < collectionLength; i++) {
      const imageObj = props[propName][i];
      if (typeof imageObj.url !== 'string') {
        return new Error(
          'Invalid or no url found in `' + propName + '` supplied to ' +
          componentName + '. Validation failed.'
        );
      }
      if (typeof imageObj.width !== 'number') {
        return new Error(
          'Invalid or no width found in`' + propName + '` supplied to ' +
          componentName + '. Validation failed.'
        );
      }
    }
  },
  defaultIndex: React.PropTypes.number, // The default image to render
  noscriptIndex: React.PropTypes.number, // The default image to render on noscript
  alt: React.PropTypes.string,
  imgStyle: React.PropTypes.object,
  baseStyle: React.PropTypes.object,
  shouldBlur: React.PropTypes.bool,
  blurAmmount: React.PropTypes.string,
  renderOutOfView: React.PropTypes.bool
};

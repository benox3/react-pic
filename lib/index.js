import React, { Component } from 'react';
import getResponsiveImage from './utils/getResponsiveImage';
import debounce from './utils/debounce';
import isElementInView from './utils/isElementInView';
import ImageBase from './server/';

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
  }

  componentDidMount() {
    // set optimal image if in view or if elected to render out of view on mount
    this.props.renderOutOfView ? this.setResponsiveImage(): this.inViewHandler();

    // set responsive image on scroll
    window.addEventListener('scroll', debounce(() => {
      this.inViewHandler();
    }, 150));

    // set responsive image on resize
    window.addEventListener('resize', debounce(this.setResponsiveImage, 150));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', debounce(() => {
      this.inViewHandler();
    }, 150));

    window.removeEventListener('resize', debounce(this.setResponsiveImage, 150));
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
      <div ref='base' style={{
        position: 'relative',
        margin: '-5px',
        overflow: 'hidden'
      }}>
        <ImageBase {...this.props} {...this.state} />
      </div>
    );
  }
}

/** Default Props */
Pic.defaultProps = {
  alt: '',
  defaultIndex: 0,
  shouldBlur: true,
  blurAmmount: '10px',
  baseStyle: {
    position: 'relative',
    margin: '-5px',
    overflow: 'hidden'
  },
  imgStyle: {
    margin: '0 auto',
    maxWidth: '100%',
    width: '100%'
  },
  images: [],
  renderIfOutOfView: false
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

import React, { Component } from 'react';
import getResponsiveImage from './utils/getResponsiveImage';
import debounce from './utils/debounce';
import Image from './ImageServer';

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
      isMounted: false
    };

    this.setResponsiveImage = this.setResponsiveImage.bind(this);
  }

  componentDidMount() {
    this.setResponsiveImage();

    this.setState({
      isMounted: true
    });

    // set responsive image on resize
    window.addEventListener('resize', debounce(this.setResponsiveImage, 150));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', debounce(this.setResponsiveImage, 150));
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
        image: responsiveImage
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
        position: 'relative'
      }}>
        <Image {...this.props} {...this.state} />
      </div>
    );
  }
}

/** Default Props */
Pic.defaultProps = {
  alt: '',
  defaultIndex: 0,
  style: {
    margin: '0 auto',
    maxWidth: '100%',
    width: '100%'
  },
  images:[]
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
  alt: React.PropTypes.string
};

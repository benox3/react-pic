import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import getResponsiveImage from './utils/getResponsiveImage';

/**
 * Pic Component
 */
export default class Pic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: get(props.images, props.defaultIndex)
    };

    this.setResponsiveImage = this.setResponsiveImage.bind(this);
  }

  componentDidMount() {
    this.setResponsiveImage();

    // set responsive image on resize
    window.addEventListener('resize', debounce(this.setResponsiveImage, 150));

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
    const { alt, style } = this.props;

    if (!this.state.image) {
      return null;
    }

    return (
      <div ref='base'>
        <img
          alt={alt}
          style={style}
          src={this.state.image.url} />
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
  alt: React.PropTypes.string
};

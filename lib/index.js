import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
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

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidMount() {
    this.setResponsiveImage();

    // set responsive image on resize
    window.addEventListener('resize', debounce(this.setResponsiveImage, 150));

  }

  setResponsiveImage() {
    try {
      const imageSlotWidth = this.refs.img.width;
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
      <img
        ref='img'
        style={this.props.style}
        src={this.state.image.url} />
    );
  }
}

/** Default Props */
Pic.defaultProps = {
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
  defaultIndex: React.PropTypes.number // The default image to render
};

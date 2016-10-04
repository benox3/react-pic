import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import debounce from 'lodash/debounce';
import getResponsiveImage from './utils/getResponsiveImage';

/**
 * Pic Component
 */
export default class Pic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.images[props.defaultIndex]
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
    const imageSlotWidth = this.refs.img.width;
    const responsiveImage = getResponsiveImage(
      imageSlotWidth,
      this.props.images,
      this.state.image
    );
    this.setState({
      image: responsiveImage
    });
  }

  render() {
    return (
      <img
        ref='img'
        style={{
          margin: '0 auto',
          maxWidth: '100%',
          width: '100%'
        }}
        src={this.state.image.url} />
    );
  }
}

/** Default Props */
Pic.defaultProps = {
  defaultIndex: 0
};

/** Prop Types */
Pic.propTypes = {
  images: React.PropTypes.array, // The collection of images
  defaultIndex: React.PropTypes.number // The default image to render
};

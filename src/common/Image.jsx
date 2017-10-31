import React, { Component, PropTypes } from 'react';

export default class Image extends Component {
  static propTypes = {
    alt: PropTypes.string.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
    imgStyle: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ).isRequired,
    isBlurred: PropTypes.bool.isRequired,
    blurAmount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  };

  getStyle() {
    const { imgStyle, isBlurred, blurAmount } = this.props;
    if (isBlurred) {
      return {
        ...imgStyle,
        filter: `blur(${blurAmount})`,
      };
    }

    return imgStyle;
  }

  render() {
    const { alt, image } = this.props;
    return (
      <img
        alt={alt}
        style={this.getStyle()}
        src={image.url}
      />
    );
  }
}

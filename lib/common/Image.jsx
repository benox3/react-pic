import React, { Component } from 'react';

export default class Image extends Component {
  getStyle() {
    const { imgStyle, isBlurred, blurAmmount } = this.props;

    if (isBlurred) {
      return {
        ...imgStyle,
        filter: `blur(${blurAmmount})`
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
        src={image.url} />
    );
  }
}

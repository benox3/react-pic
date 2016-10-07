import React, { Component } from 'react';

export default class ImageClient extends Component {
  render() {
    const { alt, style, image } = this.props;

    return (
      <img
        alt={alt}
        style={style}
        src={image.url} />
    );
  }
}

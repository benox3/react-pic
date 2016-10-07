import React, { Component } from 'react';
import NoScriptImg from './NoScriptImg';

export default class ImageServer extends Component {
  render() {
    const { alt, style, image, noScriptImage } = this.props;

    return (
      <div>
        <NoScriptImg
          alt={alt}
          image={noScriptImage}
          style={style} />

        <img
          alt={alt}
          style={style}
          src={image.url} />
      </div>
    );
  }
}

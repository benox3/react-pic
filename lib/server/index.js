import React, { Component } from 'react';
import NoScriptImg from './NoScriptImg';
import Image from '../common/Image';
import shallowCompare from 'react-addons-shallow-compare';

export default class ImageBase extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {
      alt,
      imgStyle,
      noScriptImage
    } = this.props;

    return (
      <div>
        <NoScriptImg
          alt={alt}
          image={noScriptImage}
          style={{
            ...imgStyle,
            position: 'absolute',
            zIndex: imgStyle.zIndex ? imgStyle.zIndex + 1 : 10
          }} />

        <Image {...this.props} />
      </div>
    );
  }
}

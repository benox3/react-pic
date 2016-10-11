import React, { Component } from 'react';
import NoScriptImg from './NoScriptImg';
import Image from '../common/Image';
import shallowCompare from 'react-addons-shallow-compare';

export default class ImageServer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {
      alt,
      style,
      noScriptImage
    } = this.props;

    return (
      <div>
        <NoScriptImg
          alt={alt}
          image={noScriptImage}
          style={style} />

        <Image {...this.props} />
      </div>
    );
  }
}

import React, { Component } from 'react';
import Image from '../common/Image';
import shallowCompare from 'react-addons-shallow-compare';

export default class ImageBase extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <Image {...this.props} />
    );
  }
}

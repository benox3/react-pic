import React, { Component } from 'react';
import convertReactToHTMLStyle from '../utils/convertReactToHTMLStyle';

export default class NoScriptImg extends Component {
  render() {
    const { alt, style, image} = this.props;

    if(!image) {
      return null;
    }

    return (
      <noscript dangerouslySetInnerHTML={{
        __html:
          '<img ' +
            `alt='${alt}' ` +
            `style='${convertReactToHTMLStyle(style)}' ` +
            `src='${image.url}' />`
      }} />
    );
  }
}

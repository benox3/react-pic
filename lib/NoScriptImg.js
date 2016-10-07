import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';

export default class NoScriptImg extends Component {
  render() {
    const { alt, style, image} = this.props;

    if(!image) {
      return null;
    }

    return (
      <noscript dangerouslySetInnerHTML={{
        __html: ReactDOMServer.renderToStaticMarkup(
          <img
            alt={alt}
            style={{
              ...style,
              position: 'absolute'
            }}
            src={image.url} />
        )
      }} />
    );
  }
}

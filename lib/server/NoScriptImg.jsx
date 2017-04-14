import React, { PropTypes } from 'react';
import convertReactToHTMLStyle from '../utils/convertReactToHTMLStyle';

const NoScriptImg = ({ alt, style, image }) => (
  <noscript
    dangerouslySetInnerHTML={{
      __html:
        '<img ' +
          `alt='${alt}' ` +
          `style='${convertReactToHTMLStyle(style)}' ` +
          `src='${image.url}' />`,
    }}
  />
);

NoScriptImg.propTypes = {
  alt: PropTypes.string.isRequired,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ).isRequired,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
};

export default NoScriptImg;

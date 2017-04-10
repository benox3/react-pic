import React, { PropTypes } from 'react';
import NoScriptImg from './NoScriptImg';
import Image from '../common/Image';

const ImageWrapper = (props) => {
  const { alt, imgStyle, noScriptImage } = props;
  return (
    <div>
      <NoScriptImg
        alt={alt}
        image={noScriptImage}
        style={{
          position: 'absolute',
          zIndex: imgStyle.zIndex ? imgStyle.zIndex + 1 : 10,
          ...imgStyle,
        }}
      />
      <Image {...props} />
    </div>
  );
};

ImageWrapper.propTypes = {
  alt: PropTypes.string,
  imgStyle: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ).isRequired,
  noScriptImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
};

ImageWrapper.defaultProps = {
  alt: null,
  noScriptImage: null,
};

export default ImageWrapper;

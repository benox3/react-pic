import reduce from 'lodash/reduce';

/**
 * Get the responsive image.
 *
 * Find the image that is equal to or slightly larger than imageSlotWidth.
 * @param  {Number} imageSlotWidth - The width of the image slot.
 * @param  {Array}  images         - The images.
 * @param  {Object} default        - The default image width and url.
 * @return {Object} image          - The responsive image.
 */
export default function getResponsiveImage(imageSlotWidth, images, currentImg) {
  return reduce(images, (prev, cur) => {

    if (prev && prev.width === imageSlotWidth) {
      return prev;
    }

    if (cur.width === imageSlotWidth) {
      return cur;
    }

    if (prev.width < imageSlotWidth) {
      return cur;
    } else {
      return prev;
    }

  }, currentImg);
}

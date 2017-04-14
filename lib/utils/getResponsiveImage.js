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
  return images.reduce((prev, cur) => {
    if (prev.width < imageSlotWidth) {
      return cur;
    }
    return prev;
  }, currentImg);
}

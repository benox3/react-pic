/**
 * Check if an element is in view.
 * @param  {HTMLElement} el - The element to check.
 * @return {Boolean}
 */
export default function isElementInView(el) {
  const rect = el.getBoundingClientRect();

  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight)
  );
}

/**
 * Trigger last function invoked at end of wait
 * @callback func                - The function to invoke
 * @param  {Number} wait         - The ammount of time to wait before invoking
 * @param  {Boolean} [immediate] - Should the callback be invoked immediately
 */
export default function debounce(func, wait, immediate) {
  let timeout;
  return (...args) => {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

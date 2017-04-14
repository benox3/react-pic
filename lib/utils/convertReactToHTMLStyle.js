export default function convertReactToHTMLStyle(styles) {
  return Object.keys(styles).reduce((styleString, style) => (
     `${styleString}${style}:${styles[style]};`
  ), '')
  .replace(
    /(ms[A-Z])/g, '-$1',
  )
  .replace(
    /([A-Z])/g, '-$1',
  )
  .toLowerCase();
}

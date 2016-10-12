export default function convertReactToHTMLStyle(style) {
  let styleString = '';
  for (let i in style) {
    styleString += i.replace(
      /(ms[A-Z])/g, '-$1'
    ).replace(
      /([A-Z])/g, '-$1'
    ).toLowerCase();
    styleString += `:${style[i]};`;
  }
  return styleString;
}

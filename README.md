# react-pic

[![NPM version](https://img.shields.io/npm/v/react-pic.svg)](https://www.npmjs.com/package/react-pic)
[![Build Status](https://travis-ci.org/benox3/react-pic.svg?branch=master)](https://travis-ci.org/benox3/react-pic)
[![Coverage Status](https://coveralls.io/repos/github/benox3/react-pic/badge.svg?branch=master)](https://coveralls.io/github/benox3/react-pic?branch=master)

React component for progressive and responsive image loading.

react-pic works universally. On the server-side, it works by setting a default image (usually something very small to reduce data). On the client-side, it will try to load the optimal image based on [prop data](#Props).

## Installation

#### NPM:
```sh
npm install react-pic --save
```

#### CDN:
```html
<script src='https://unpkg.com/react-pic@latest/dist/umd/react-pic.js'></script>

<!-- or use minified -->
<script src='https://unpkg.com/react-pic@latest/dist/umd/react-pic.min.js'></script>
```

## Usage
```javascript
import React, { Component } from 'react';
import Pic from 'react-pic';

const images = [
  {
    width: 40,
    url: 'http://placehold.it/40?text=♥'
  },
  {
    width: 250,
    url: 'http://placehold.it/250?text=♥'
  }
];

export default class Example extends Component {
  render() {
    return <Pic images={images} />;
  }
}
```

## Props

| name         | default | required | type   | description                                                                                                                |
|--------------|----------|--------|----------|-----------------------------------------------------------------------------------------------------------------|
| images       | | true     | array  | The collection of images you would like to use as a source.                                                                |
| alt       | | false     | string  | Text equivalent of the image. https://www.w3.org/QA/Tips/altAttribute                                                                |
| defaultIndex |  0 | false    | number | The image object to use on initial render.                                                                                 |
| noscriptIndex | `images.length-1` | false    | number | The image object to use on noscript render.                                                                                 |
| baseStyle        | `{ position: 'relative', margin: '-5px', overflow: 'hidden' }` | false    | object | Override the container style object. |
| imgStyle        | `{ margin: '0 auto', maxWidth: '100%', width: '100%' }` | false    | object | Override the image style object. |
| shouldBlur        | true | false    | boolean | Determines if the image should be blurred before setting the optimal image. |
| blurAmmount        | '10px' | false    | string | The ammount of blur. Expected format: '10px' or '15%'. |
| renderOutOfView        | false | false    | boolean | Determines if the optimal image should be selected even if not in view |

## Special Thanks

- To [remarkablemark](https://github.com/remarkablemark) and [tdlm](https://github.com/tdlm) for their feedback and review.

## License

[MIT](https://github.com/benox3/react-pic/blob/master/LICENSE)

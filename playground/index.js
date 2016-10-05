'use strict';

import React, { Component } from 'react';
import Pic from '../lib/index.js';

export default class Playground extends Component {
  render() {
    return (
      <html>
        <head>
          <meta charSet='UTF-8' />
          <title>react-pic</title>
        </head>
        <body>
          <div id="root">
            <Pic
                alt='heart'
                images={[
                  {
                    width: 290,
                    url: 'http://placehold.it/290?text=♥'
                  },
                  {
                    width: 300,
                    url: 'http://placehold.it/300?text=♥'
                  },
                  {
                    width: 353,
                    url: 'http://placehold.it/353?text=♥'
                  },
                  {
                    width: 367,
                    url: 'http://placehold.it/367?text=♥'
                  },
                  {
                    width: 630,
                    url: 'http://placehold.it/630?text=♥'
                  }
                ]} />
          </div>
          <script src='//localhost:8080/build/react-pic.js' />
        </body>
      </html>
    );
  }
}

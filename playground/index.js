import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Pic from '../index.js';

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
            <Pic serverImg='//placekitten.com/200/300' />
          </div>
          <script src='//localhost:8080/build/react-pic.js' />
        </body>
      </html>
    );
  }
}

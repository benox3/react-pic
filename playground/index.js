'use strict';

import React, { Component } from 'react';
import Pic from '../lib/index.js';

export default class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.setState({show:!this.state.show});
  }

  render() {
    return (
      <html>
        <head>
          <meta charSet='UTF-8' />
          <title>react-pic</title>
        </head>
        <body>
          <div id="root" style={{height:1500}}>
            <button onClick={this.clickHandler}>
              Toggle
            </button>
            {
              this.state.show &&
              <Pic
                  alt='winky face'
                  images={[
                    {
                      width: 40,
                      url: 'http://placehold.it/40?text=😉'
                    },
                    {
                      width: 200,
                      url: 'http://placehold.it/200?text=😉'
                    },
                    {
                      width: 400,
                      url: 'http://placehold.it/400?text=😉'
                    },
                    {
                      width: 600,
                      url: 'http://placehold.it/600?text=😉'
                    },
                    {
                      width: 800,
                      url: 'http://placehold.it/800?text=😉'
                    }
                  ]} />
            }
          </div>
          <script src='//localhost:8080/build/react-pic.js' />
        </body>
      </html>
    );
  }
}

import React from 'react';
import Playground from './index.js';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

const app = express();
const port = 8000;

app.get('/', function(req, resp) {
  const html = ReactDOMServer.renderToString(
    React.createElement(Playground)
  );
  resp.send(html);
});

app.listen(port, function() {
  console.log(`http://localhost:${port}`); // eslint-disable-line no-console
});

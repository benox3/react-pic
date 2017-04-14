import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import Playground from './Playground';


const app = express();
const port = 8000;

app.get('/', (req, resp) => {
  const html = ReactDOMServer.renderToString(
    React.createElement(Playground),
  );
  resp.send(html);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`); // eslint-disable-line no-console
});

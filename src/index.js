import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Routers from './routers/routers.js';
import reset from '@/common/css/reset.css';

ReactDOM.render(
  <Routers />, document.getElementById('root')
);

registerServiceWorker();

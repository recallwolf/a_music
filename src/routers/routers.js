import React, { Component } from 'react';
import {HashRouter, Route} from 'react-router-dom';
import App from '@/App.js'

class Routers extends Component {
  render() {
    return (
      <HashRouter>
        <Route path="/" component={App}></Route>
      </HashRouter>
    );
  }
}

export default Routers;
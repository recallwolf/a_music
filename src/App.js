import React, { Component } from 'react';
import Tab from '@/components/tab/tab.js';
import Recommend from '@/components/recommend/recommend.js';
import Singer from '@/components/singer/singer.js';
import {Route, Redirect, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Tab></Tab>
        <Switch>
          <Route path="/recommend" component={Recommend}></Route>
          <Route path="/singer" component={Singer}></Route>
          <Redirect from="/" to="/recommend" exact></Redirect>
        </Switch>
      </div>
    );
  }
}

export default App;

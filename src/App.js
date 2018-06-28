import React, { Component } from 'react';
import Tab from '@/components/tab/tab.js';
import Recommend from '@/components/recommend/recommend.js';
import Singer from '@/components/singer/singer.js';
import Table from '@/components/table/table.js';
import Search from '@/components/search/search.js';
import {Route, Redirect, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Tab></Tab>
        <Switch>
          <Route path="/recommend" component={Recommend}></Route>
          <Route path="/singer" component={Singer}></Route>
          <Route path="/table" component={Table}></Route>
          <Route path="/search" component={Search}></Route>
          <Redirect from="/" to="/recommend" exact></Redirect>
        </Switch>
      </div>
    );
  }
}

export default App;

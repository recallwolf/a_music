import React, { Component } from 'react';
import tabs from './tab.less'
import {NavLink} from 'react-router-dom';

class tab extends Component {
  render() {
    return (
      <div className="tab">
        <div className="tab-title">
          MUSIC CITY
        </div>
        <div className="switch">
          <NavLink to="/recommend" className="switch-item" acitveclassname="active"><p className="switch-text">推荐</p></NavLink>
          <NavLink to="/singer" className="switch-item" acitveclassname="active"><p className="switch-text">歌手</p></NavLink>
          <NavLink to="/table" className="switch-item" acitveclassname="active"><p className="switch-text">排行</p></NavLink>
          <NavLink to="/search" className="switch-item" acitveclassname="active"><p className="switch-text">搜索</p></NavLink>
        </div>
      </div>
    );
  }
}

export default tab;
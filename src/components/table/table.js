import React, { Component } from 'react';
import {getTopList} from '@/api/tableApi';
import {ERR_OK} from '@/api/config';
import tables from './table.less'

class table extends Component {
  constructor() {
    super()
    this.state = {
      toplist: []
    }
  }
  componentDidMount() {
    this._getTopList()
  }
  _getTopList() {
    getTopList().then((res) => {
      if (res.code === ERR_OK) {
        this.setState({
          toplist: res.data.topList
        })
      }
      console.log(this.state.toplist)
    })
  }
  render() {
    return (
      <div className="table">
        {this.state.toplist.map((list, index) =>
          <div key={index} className="table-box">
            <div className="table-img">
              <img src={list.picUrl} style={{width: '100px', height: '100px'}} />
            </div>
            <div className="table-text">
              {list.songList.map((song, index) => 
                <div key={index} className="table-song">
                  <p className="text">{song.singername}</p>
                  <p className="text">{song.songname}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default table;
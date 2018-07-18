import React, { Component } from 'react';
import toplists from './toplist.less';
import {getMusicList} from '@/api/tableApi.js';
import {ERR_OK} from '@/api/config.js';
import {createSong} from '@/common/js/song.js'

class toplist extends Component {
  constructor() {
    super()
    this.state = {
      toplists: []
    }
  }
  componentDidMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push('/table')
    }
    else {
      this.refs.wrapper.style.backgroundImage = `url(${this.props.location.state})`
      this._getMusicList(this.props.match.params.id)
    }
  }
  _getMusicList(id) {
    getMusicList(id).then((res) => {
      if (res.code === ERR_OK) {
        this.setState({
          toplists: this._normalizeSongs(res.songlist)
        })
      }
    })
  }
  _normalizeSongs(list) {
    let ret = []
    list.forEach((item) => {
      const musicData = item.data
      if (musicData.songid && musicData.albummid) {
        ret.push(createSong(musicData))
      }
    })
    return ret
  }
  back() {
    this.props.history.goBack()
  }
  render() {
    return (
      <div className="toplist">
        <div className="toplist-img" ref="wrapper">
          <span className="icon-back icon-pos" onClick={this.back.bind(this)}></span>
        </div>
        <div className="toplist-content">
          {this.state.toplists.map((song, index) => 
            <div key={index} className="toplist-info">
              <div className="toplist-name">
                {song.name}
              </div>
              <div className="toplist-text">
                {song.singer} {song.name}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default toplist;
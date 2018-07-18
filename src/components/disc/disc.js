import React, { Component } from 'react';
import discs from './disc.less';
import {getSongList} from '@/api/recommendApi.js';
import {ERR_OK} from '@/api/config.js';
import {createSong} from '@/common/js/song.js'

class disc extends Component {
  constructor() {
    super()
    this.state = {
      discs: []
    }
  }
  componentDidMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push('/recommend')
    }
    else {
      this.refs.wrapper.style.backgroundImage = `url(${this.props.location.state})`
      this._getSongList(this.props.match.params.id)
    }
  }
  _getSongList(id) {
    getSongList(id).then((res) => {
      if (res.code === ERR_OK) {
        this.setState({
          discs: this._normalizeSongs(res.cdlist[0].songlist)
        })
      }
    })
  }
  _normalizeSongs(list) {
    let ret = []
    list.forEach((musicData) => {
      if (musicData.songid && musicData.albumid) {
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
      <div className="disc">
        <div className="disc-img" ref="wrapper">
          <span className="icon-back icon-pos" onClick={this.back.bind(this)}></span>
        </div>
        <div className="disc-content">
          {this.state.discs.map((song, index) => 
            <div key={index} className="disc-info">
              <div className="disc-name">
                {song.name}
              </div>
              <div className="disc-text">
                {song.singer} {song.name}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default disc;
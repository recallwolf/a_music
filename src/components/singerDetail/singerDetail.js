import React, { Component } from 'react';
import singerDetails from './singerDetail.less';
import {ERR_OK} from '@/api/config.js';
import {getSingerDetail} from '@/api/singerApi.js';
import {createSong} from '@/common/js/song'

class singerDetail extends Component {
  constructor() {
    super()
    this.state = {
      singerDetail: []
    }
  }
  componentDidMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push('/singer')
    }
    else {
      this.refs.wrapper.style.backgroundImage = `url(${this.props.location.state})`
      this._getSingerDetail(this.props.match.params.id)
    }
  }
  _getSingerDetail(id) {
    getSingerDetail(id).then((res) => {
      if (res.code === ERR_OK) {
        this.setState({
          singerDetail: this._normalizeSongs(res.data.list)
        })
      }
    })
  }
  _normalizeSongs(list) {
    let ret = []
    list.forEach((item) => {
      let {musicData} = item
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
      <div className="singerDetail">
        <div className="singerDetail-img" ref="wrapper">
          <span className="icon-back icon-pos" onClick={this.back.bind(this)}></span>
        </div>
        <div className="singerDetail-content">
          {this.state.singerDetail.map((song, index) => 
            <div key={index} className="singerDetail-info">
              <div className="singerDetail-name">
                {song.name}
              </div>
              <div className="singerDetail-text">
                {song.singer} {song.name}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default singerDetail;
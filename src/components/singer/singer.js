import React, { Component } from 'react';
import {getSingerList} from '@/api/singerApi.js';
import {ERR_OK} from '@/api/config.js';
import singers from './singer.less';

class singer extends Component {
  constructor() {
    super()
    this.state = {
      singers: []
    }
  }
  componentDidMount() {
    this._getSingerList()
  }
  toSingerDetail(singer) {
    this.props.history.push({pathname: `/singer/${singer.id}`, state: singer.avatar})
  }
  _getSingerList() {
    getSingerList().then((res) => {
      if (res.code === ERR_OK) {
        this.setState({
          singers: this._normalizeSinger(res.data.list)
        })
      }
    })
  }
  _normalizeSinger(list) {
    let map = {
      hot: {
        title: '热门',
        items: []
      }
    }
    class Singer {
      constructor({id, name}) {
        this.id = id,
        this.name = name,
        this.avatar = 'https://y.gtimg.cn/music/photo_new/T001R300x300M000' + id +'.jpg?max_age=2592000'
      }
    }
    list.forEach((item, index) => {
      if (index < 10) {
        map.hot.items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name,
        }))
      }
      const key = item.Findex
      if (!map[key]) {
        map[key] = {
          title: key,
          items: []
        }
      }
      map[key].items.push(new Singer({
        id: item.Fsinger_mid,
        name: item.Fsinger_name
      }))
    })
    let hot = []
    let ret = []
    for(let key in map) {
      let val = map[key]
      if(val.title.match(/[a-zA-Z]/)) {
        ret.push(val)
      }
      else if (val.title === '热门') {
        hot.push(val)
      }
    }
    ret.sort((a, b) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0)
    })
    return hot.concat(ret)
  }
  render() {
    return (
      <div className="singer">
        {this.state.singers.map((singer, index) => 
          <div key={index}>
            <div>
              <div className="singer-title">
                {singer.title}
              </div>
              {singer.items.map((info, index) => 
                <div key={index} className="singer-info" onClick={this.toSingerDetail.bind(this, info)}>
                  <div className="singer-img">
                    <img src={info.avatar} style={{width: '50px', height: '50px', borderRadius: '50%'}} />
                  </div>
                  <div className="singer-name">{info.name}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default singer;
import React, { Component } from 'react';
import {getDiscList} from '@/api/recommendApi.js'
import {ERR_OK} from '@/api/config.js'
import recommends from './recommend.less'

class recommend extends Component {
  constructor() {
    super()
    this.state = {
      discList: []
    }
  }
  componentDidMount() {
    this._getDiscList()
  }
  _getDiscList() {
    getDiscList().then((res) => {
      if (res.code === ERR_OK) {
        this.setState({
          discList: res.data.list
        })
      }
    })
  }
  toDisc(item) {
    this.props.history.push({pathname: `/recommend/${item.dissid}`, state: item.imgurl})
  }
  render() {
    return (
      <div className="recommend">
        {this.state.discList.map((item, index) =>
          <div key={index} className="recommend-item" onClick={this.toDisc.bind(this, item)}>
            <div className="recommend-img">
              <img src={item.imgurl} style={{width: '60px', height: '60px'}}/>
            </div>
            <div className="recommend-text">
              <p className="title">{item.creator.name}</p>
              <p className="content">{item.dissname}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default recommend;
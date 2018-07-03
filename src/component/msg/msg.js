import React from 'react'
import {connect} from 'react-redux'
import {WingBlank} from 'antd-mobile'
import {createSelector} from 'reselect'
import QueueAnim from 'rc-queue-anim'
import '../dashboard/bossAndGenius.css'

const selector1 = createSelector(
  [
    state => state.user,
    state => state.chat
  ],
  (user, chat) => {
    const msgGroup = {}
    chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const getLast = arr => [arr.length - 1]
    const chatList = Object.keys(msgGroup).map((key) => {
      return msgGroup[key]
    }).sort((a, b) => {
      const a_last = getLast(a).create_time
      const b_last = getLast(b).create_time
      return b_last - a_last
    })
    return {user, chatList, users: chat.users}
  }
)

@connect(
  // state=>state
  state => selector1(state)
)
class Msg extends React.PureComponent {
  constructor(props) {
    super(props)
    this.timestampToTime = this.timestampToTime.bind(this)
    this.addZero = this.addZero.bind(this)
  }

  getLast(arr) {
    return arr[arr.length - 1]
  }

  timestampToTime(timestamp) {
    let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    // let Y = date.getFullYear() + '-';
    let M = this.addZero(date.getMonth()+1);
    let D = this.addZero(date.getDate());
    let h = this.addZero(date.getHours());
    let m = this.addZero(date.getMinutes());
    // let s = date.getSeconds();
    return `${M}/${D} ${h}:${m}`;
  }

  addZero(num) {
    if (num < 10) {
      num = '0' + num
    }
    return num || 0
  }

  render() {
    const userid = this.props.user._id
    const userinfo = this.props.users

    return (
      <div className="scroll-wrapper">
        <WingBlank>
          <QueueAnim delay={50}>
            {this.props.chatList.map(v => {
              const lastItem = this.getLast(v)
              let time = this.timestampToTime(lastItem.create_time)
              const targetId = v[0].from === userid ? v[0].to : v[0].from
              const unreadNum = v.filter(v => !v.read && v.to === userid).length
              return (
                <div key={lastItem._id} onClick={() => {this.props.history.push(`/chat/${targetId}`)}} className="usercard-list">
                <span>
                  <img src={require(`../img/avatar.png`)} alt=""/>
                </span>
                  <div className="desc">
                    <span className="name">{userinfo[targetId].name}</span>
                    <span className="text">{lastItem.content}</span>
                    <span className="time">{time}</span>
                    {unreadNum ? <span className="unreadNum">
                      {/*{unreadNum}*/}
                    </span> : ''}
                  </div>
                </div>
              )
            })}
          </QueueAnim>
        </WingBlank>
      </div>
    )
  }
}

export default Msg










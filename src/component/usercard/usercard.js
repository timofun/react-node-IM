import React from 'react'
import PropTypes from 'prop-types'
import {WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
import './usercard.css'

@withRouter
class UserCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: document.documentElement.clientHeight - 90,
    }
  }
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }

  handleClick(v){
    this.props.history.push(`/chat/${v._id}`)
  }

  render() {
    return (
      <WingBlank>
        <div style={{minHeight: this.state.height}}>
          <QueueAnim delay={50}>
            {this.props.userlist.map(v => (
              v.avatar ? (
                <div key={v._id} onClick={() => this.handleClick(v)} className="usercard-list">
                  <span>
                    <img src={require(`../img/avatar.png`)} alt=""/>
                  </span>
                  <div className="desc">
                    <span className="name">{v.title}</span>
                    <span className="text">2018-08-09</span>
                  </div>
                </div>
              ) : null
            ))}
          </QueueAnim>
        </div>
      </WingBlank>
    )
  }
}

export default UserCard


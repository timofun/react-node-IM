import React from 'react'
import {connect} from 'react-redux'
import {Modal, Button, WingBlank} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import Logo from '../logo/logo'
import './user.css'

@connect(
  state => state.user,
  {logoutSubmit}
)
class User extends React.PureComponent {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    const alert = Modal.alert
    alert('注销', '确认退出登录吗???', [
      {text: '取消', onPress: () => console.log('cancel')},
      {
        text: '确认', onPress: () => {
          browserCookie.erase('userid')
          this.props.logoutSubmit()
        }
      }
    ])
  }

  render() {
    const props = this.props
    console.log(props)
    // if (!props.user) {
    //   return null
    // }
    return props.user ? (
      <div className="user-container">
        <Logo></Logo>
        <WingBlank>
          <Button onClick={this.logout} activeStyle={{background: 'rgb(222, 81, 29)'}} style={{background: '#f26531', color: '#ffffff'}}>退出登录</Button>
        </WingBlank>

      </div>
    ) : <Redirect to={props.redirectTo}/>

  }
}


export default User

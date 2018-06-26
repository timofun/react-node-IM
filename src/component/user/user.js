import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Modal, Button, WingBlank} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
  state => state.user,
  {logoutSubmit}
)
class User extends React.Component {
  constructor(props) {
    super(props)
    console.log('userprops', props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    console.log('logout')
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
    if (!props.user) {
      return null
    }
    const Item = List.Item
    const Brief = Item.Brief
    console.log('获取到user', props)
    return props.user ? (
      <div>
        <Result
          img={<img src={require(`../img/${props.avatar}.png`)} style={{width: 50}} alt=""/>}
          title={props.user}
          message={props.type === 'boss' ? props.company : null}
        />

        <List renderHeader={() => '简介'}>
          <Item
            multipleLine
          >
            {props.title}
            {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
            {props.money ? <Brief>薪资:{props.money}</Brief> : null}
          </Item>
        </List>

        <WhiteSpace></WhiteSpace>

        <WingBlank>
          <Button onClick={this.logout} type='primary'>退出登录</Button>
        </WingBlank>

      </div>
    ) : <Redirect to={props.redirectTo}/>

  }
}


export default User

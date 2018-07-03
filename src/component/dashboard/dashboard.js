import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Route, Redirect} from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import Msg from '../msg/msg'
import {getMsgList, recvMsg} from '../../redux/chat.redux'
import QueueAnim from 'rc-queue-anim'

@connect(
  state => state,
  {getMsgList, recvMsg}
)
class Dashboard extends React.PureComponent {
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }

  }

  render() {
    const {pathname} = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: '女神',
        icon: 'women',
        title: '女神',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: '男神',
        icon: 'man',
        title: '男神',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    // console.log(this.props)

    const page = navList.find(v => v.path === pathname)
    // console.log(page)

    return page ? (
        <div>
          <NavBar className='fixd-header' mode='dard'>{page.title}</NavBar>
            <QueueAnim type={'scaleX'} duration={500}>

              <Route key={page.path} path={page.path} component={page.component}></Route>

            </QueueAnim>
          <NavLinkBar data={navList}></NavLinkBar>

        </div>
      ) : <Redirect to='/msg'></Redirect>

  }

}

export default Dashboard
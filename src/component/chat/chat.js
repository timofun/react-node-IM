import React from 'react'
import {List, InputItem, NavBar, Icon, Grid, WingBlank, Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'
// import QueueAnim from 'rc-queue-anim'
import BScroll from 'better-scroll'
import '../dashboard/bossAndGenius.css'

@connect(
  state => state,
  {getMsgList, sendMsg, recvMsg, readMsg}
)
class Chat extends React.PureComponent {
  constructor(props) {
    super(props)
    this.scroll = this.scroll
    this.state = {text: '', msg: []}
  }

  componentDidMount() {
    // if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
      setTimeout(() => {
        this.scroll = new BScroll('.scroll-wrapper', {
          click: true,
          fade: true,
          pullDownRefresh: {
            threshold: 90,
            stop: 20
          }
        })
        this.scroll.scrollTo(0, this.scroll.maxScrollY, 700, 'bounce')
      }, 500)
    // }
  }

  componentWillUnmount() {
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }

  fixCarousel() {
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  handleSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    if (msg.trim() === '') {
      Toast.fail('消息不能为空', 1)
      return
    }

    this.props.sendMsg({from, to, msg})
    setTimeout(() => {
      this.scroll.scrollTo(0, this.scroll.maxScrollY, 700, 'bounce')
    }, 300)
    this.setState({
      text: '',
      showEmoji: false
    })
  }

  render() {
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
      .split(' ')
      .filter(v => v)
      .map(v => ({text: v}))
    const userid = this.props.match.params.user
    const users = this.props.chat.users
    console.log(users, userid)
    if (!users[userid]) {
      return null
    }
    console.log(123456)
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
    return (
      <div id='chat-page'>
        <div>
          <NavBar
            mode='dark'
            icon={<Icon type="left"/>}
            onLeftClick={() => {
              this.props.history.goBack()
            }}
          >
            {users[userid].name}
          </NavBar>
          <div className="scroll-wrapper">
            <div>
              <WingBlank>
                {/*<QueueAnim delay={50}>*/}
                  {chatmsgs.map(v => {
                    return v.from === userid ? (
                      <div key={v._id} className="chat-list-left">
                        <span className="avatar">
                          <img src={require(`../img/avatar.png`)} alt=""/>
                        </span>
                            <div className="desc">
                              <span className="content">{v.content}</span>
                            </div>
                          </div>

                        ) : (
                          <div key={v._id} className="chat-list-right">
                            <div className="desc">
                              <span className="content">{v.content}</span>
                            </div>
                            <span className="avatar">
                          <img src={require(`../img/avatar.png`)} alt=""/>
                        </span>
                      </div>
                    )
                  })}
                {/*</QueueAnim>*/}
              </WingBlank>
            </div>
          </div>
          <div className="stick-footer">
            <List>
              <InputItem
                placeholder='请输入'
                value={this.state.text}
                onChange={v => {
                  this.setState({text: v})
                }}
                extra={
                  <div>
									<span
                    style={{marginRight: 15}}
                    onClick={() => {
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      })
                      this.fixCarousel()
                    }}
                  >😃</span>
                    <span onClick={() => this.handleSubmit()}>发送</span>
                  </div>
                }
              ></InputItem>
            </List>

            {this.state.showEmoji ? <Grid
              data={emoji}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={el => {
                this.setState({
                  text: this.state.text + el.text
                })

              }}
            /> : null}
          </div>
        </div>
      </div>
    )
  }
}

export default Chat
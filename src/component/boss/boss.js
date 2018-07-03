import React from 'react'
// import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'
import BScroll from 'better-scroll'
import '../dashboard/bossAndGenius.css'

@connect(
  state => state.chatuser,
  {getUserList}
)
class Boss extends React.Component {
  constructor(props) {
    super(props);
    this.scroll = this.scroll
    this.pullingDown = this.pullingDown.bind(this)
  }

  componentDidMount() {
    this.props.getUserList('genius')
    this.scroll = new BScroll('.scroll-wrapper', {
      click: true,
      fade: true,
      pullDownRefresh: {
        threshold: 90,
        stop: 20
      }
    })
    this.scroll.on('pullingDown', this.pullingDown)
  }

  pullingDown() {
    this.props.getUserList('genius')
    setTimeout(() => {
      this.scroll.finishPullDown()
    }, 1000)
  }


  render() {
    return(
      <div className="scroll-wrapper">
        <UserCard userlist={this.props.userlist}></UserCard>
      </div>

    )
  }

}

export default Boss
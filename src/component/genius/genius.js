import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'
import '../dashboard/bossAndGenius.css'
import BScroll from "better-scroll";

@connect(
  state => state.chatuser,
  {getUserList}
)
class Genius extends React.Component {
  constructor(props) {
    super(props);
    this.scroll = this.scroll
    this.pullingDown = this.pullingDown.bind(this)
  }

  componentDidMount() {
    this.props.getUserList('boss')
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
    this.props.getUserList('boss')
    setTimeout(() => {
      this.scroll.finishPullDown()
    }, 1000)
  }


  render() {
    return (
      <div className="scroll-wrapper">
        <UserCard userlist={this.props.userlist}></UserCard>
      </div>
    )
  }

}

export default Genius
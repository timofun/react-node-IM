import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
  state => state.chatuser,
  {getUserList}
)
class Genius extends React.Component {

  componentDidMount() {
    this.props.getUserList('boss')
    console.log('Geniusprops', this.props)
  }

  render() {
    console.log('Geniusprops1', this.props)
    return <UserCard userlist={this.props.userlist}></UserCard>
  }

}

export default Genius
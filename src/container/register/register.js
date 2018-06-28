import React from 'react'
import Logo from '../../component/logo/logo'
import {List, Radio, WhiteSpace} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {regisger} from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'
import '../login/login.css'
import phone from '../login/phone.png'
import pwd from '../login/pwd.png'

@connect(
  state => state.user,
  {regisger}
)
@imoocForm
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
  }

  componentDidMount() {
    this.props.handleRadio('type', 'genius')
  }

  handleRegister() {
    this.props.regisger(this.props.state)
  }

  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div className="register-and-login">
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo></Logo>
          {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
          <div className="content-text">
            <span className="phoneId">
              <img src={phone} alt="" />
              <input type="text" className="input" placeholder="请输入帐号" onChange={(event) => this.props.handleChange('user', event)} />
            </span>
            <span className="pwdId">
              <img src={pwd} alt="" />
              <input type="password" className="input" placeholder="请输入密码" onChange={(event) => this.props.handleChange('pwd', event)} />
            </span>
            <span className="pwdId">
              <img src={pwd} alt="" />
              <input type="password" className="input" placeholder="请确认密码" onChange={(event) => this.props.handleChange('repeatpwd', event)} />
            </span>
            <List>
              <RadioItem
                checked={this.props.state.type === 'genius'}
                onChange={() => this.props.handleRadio('type', 'genius')}
              >
                牛人
              </RadioItem>
              <RadioItem
                checked={this.props.state.type === 'boss'}
                onChange={() => this.props.handleRadio('type', 'boss')}
              >
                BOSS
              </RadioItem>
            </List>
          </div>
          <WhiteSpace/>
          <div className="btn-item">
            <button className="login" onClick={this.handleRegister}>注 册</button>
          </div>
      </div>

    )
  }
}

export default Register
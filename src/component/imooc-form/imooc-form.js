import React from 'react'


export default function imoocForm(Comp) {
  return class WrapperComp extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
      this.handleRadio = this.handleRadio.bind(this)
    }

    handleChange(key, val) {
      console.log(key, val.target.value)
      this.setState({
        [key]: val.target.value
      })
    }

    handleRadio(key, val) {
      this.setState({
        [key]: val
      })
    }

    render() {
      return <Comp handleChange={this.handleChange} handleRadio={this.handleRadio} state={this.state} {...this.props}></Comp>
    }
  }
}
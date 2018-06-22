import React from 'react'
import { Button, List } from 'antd-mobile'
class App extends React.Component {
	render() {
		const boss = 'hhhhhh'

		return (
			<div>
				<h2>哈哈哈, {boss}</h2>
				<One one="wwwww">ahhahahha</One>
			</div>
		)
	}
}

class One extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			solders: ['ni', 'wo', 'ta']
		}
		this.addSolder = this.addSolder.bind(this)
	}

	componentWillMount() {
		console.log('组件即将加载')
	}

	componentDidMount() {
		console.log('组件已经加载')
	}

	componentWillReceiveProps(nextProps) {
		console.log('组件要接受父组件的值')
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('判断是不是要更新组件')
		return true
	}

	componentWillUpdate(nextProps, nextState) {
		console.log('马上就要更新组件了')
	}

	componentDidUpdate = (prevProps, prevState) => {
		console.log('组件更新完毕')
	}

	componentWillUnmount() {
		console.log('组件卸载')
	}

	addSolder() {
		this.setState({
			solders: [...this.state.solders, 'mmmm' + Math.random()]
		})
	}

	render() {
		console.log('组件正在加载')
		const boss = 'one'
		return (
			<div>
				<h2>
					哈哈哈, {boss}, {this.props.one}
				</h2>
				<Button type="primary" onClick={this.addSolder}>
					新兵入伍
				</Button>
				<List renderHeader={() => '士兵列表'}>
					{this.state.solders.map(v => {
						return <List.Item key={v}>{v}</List.Item>
					})}
				</List>
			</div>
		)
	}
}

export default App

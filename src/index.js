import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import App from './app'
import {BrowserRouter} from 'react-router-dom'
import reducers from './reducer'
import './config'
import './index.css'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))
// export function Demo(){
// 	return <AuthRoute></AuthRoute>
// }

// boss genius me msg 4个页面
ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)

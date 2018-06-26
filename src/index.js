import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import reducers from './reducer'
import './config'
import './index.css'

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import Geniusinfo from './container/geniusinfo/geniusinfo'
import Bossinfo from './container/bossinfo/bossinfo'
import Dashboard from './component/dashboard/dashboard'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div className="index-container">
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/geniusinfo" component={Geniusinfo}></Route>
          <Route path="/bossinfo" component={Bossinfo}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)

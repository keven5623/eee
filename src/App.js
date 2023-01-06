import React, { Component } from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './pages/login'
import Admin from './pages/admin'
import FrontMember from "./components/front_member";
import Register from './pages/register'


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/frontmember' component={FrontMember}/>
          <Route path='/register' component={Register}/>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

import React from 'react'
import './App.css';
import AuthorizationForm from './AuthorizationForm'
import {Posts} from './Posts';
import {
    Route,
    Switch,
    Redirect,
    withRouter
  } from "react-router-dom"

class App extends React.Component {
  render() {
      const {history} = this.props

      return (
          <div className="App">
              <Switch>
                  <Route history={history} path='/login'><AuthorizationForm/> </Route>
                  <Route history={history} path='/posts'><Posts/></Route>
                  <Redirect from='/' to='/login' exact/>
              </Switch>
          </div>
      );
  }
}

export default withRouter(App);


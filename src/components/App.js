import React from 'react'
import '../App.css';
import AuthorizationForm from './LoginForm'
import {Posts} from './Posts';
import PostForm, {PostDelete} from './Post';
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
                  <Route history={history} exact path='/posts'><Posts/></Route>
                  <Route history={history} exact path='/posts/new'><PostForm/></Route>
                  <Route history={history} exact path='/posts/:id/edit'
                         render={({match}) => <PostForm key={this.props.location.key} match={match}/>}/>
                  <Route history={history} exact path='/posts/:id/:user_id'
                         render={({match}) => <PostDelete key={this.props.location.key} match={match}/>}/>
                  <Redirect from='/' to='/login' exact/>
              </Switch>
          </div>
      );
  }
}

export default withRouter(App);


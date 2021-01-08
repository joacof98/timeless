import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import {AuthProvider} from './util/auth'
import AuthRoute from './util/AuthRoute';
import NotAuthRoute from './util/NotAuthRoute';
import 'semantic-ui-css/semantic.min.css'

import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Navbar from './Components/Navbar'
import Profile from './Pages/Profile'
import Settings from './Pages/Settings'
import Habits from './Pages/Habits'
import Posts from './Pages/Posts'
import CreatePost from './Pages/CreatePost'
import PostPage from './Pages/PostPage'

const App: React.FC = () => {

  return (
    <div>
      <AuthProvider>
        <Router>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:post_id" component={PostPage} />
          <NotAuthRoute exact path="/create" component={CreatePost} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/u/:username" component={Profile} />
          <NotAuthRoute exact path="/settings" component={Settings} />
          <NotAuthRoute exact path="/habits" component={Habits} />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import {AuthProvider} from './util/auth'
import AuthRoute from './util/AuthRoute';
import 'semantic-ui-css/semantic.min.css'

import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Navbar from './Components/Navbar'
import Profile from './Pages/Profile'

const App: React.FC = () => {

  return (
    <div>
      <AuthProvider>
        <Router>
          <Navbar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/u/:username" component={Profile} />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

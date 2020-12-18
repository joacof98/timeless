import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

import Home from './Pages/Home';
import Login from './Pages/Login';
import Navbar from './Components/Navbar'

const App: React.FC = () => {

  return (
    <div>
      <Router>
        <Navbar />
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
      </Router>
    </div>
  );
}

export default App;

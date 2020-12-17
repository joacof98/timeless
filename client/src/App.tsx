import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

import Home from './Pages/Home';

const App: React.FC = () => {

  return (
    <div className="App">
      <Router>
        <Route exact path='/' component={Home} />
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import {Switch, Route, BrowserRouter as Router,} from 'react-router-dom';

import HomePage from './pages/home-page';
import ResultsPage from './pages/results-page';

class App extends React.Component {
  render(){
  return (
    <div className="App">
      <h1>Touchy Feely</h1>
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/results' component={ResultsPage} />
        </Switch>
      </Router>
    </div>
  );
  }
}

export default App;

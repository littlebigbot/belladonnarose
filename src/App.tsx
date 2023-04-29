import * as React from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import './App.scss';

function App(): React.ReactElement {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <header className="menu">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </header>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

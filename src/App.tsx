import * as React from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Resume from './Resume';
import './App.scss';
import HtmlClasses from './HtmlClasses';

function App(): React.ReactElement {
  return (
    <Router basename={process.env.PUBLIC_URL}>

     <HtmlClasses/>

      <div className="App">
        <header className="menu">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/resume">Resume</Link>
        </header>

        <Switch>
          <Route exact path="/">
            <Resume />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

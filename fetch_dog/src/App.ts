import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="./components/login">Login</Link>
            </li>
            <li>
              <Link to="./components/fetchDogs">Search</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="./components/login">
            <Login setIsAuthenticated={setIsAuthenticated} />
          </Route>
          <Route path="./components/fetchDogs">
            <Search isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          </Route>
          <Redirect to="./components/login" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

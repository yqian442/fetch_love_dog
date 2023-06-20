import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

import Login from './components/login';
import Search from './components/fetchDogs';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      <div className="header">
        <h1>Search My Dog</h1>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated}/>}/>
          <Route path="/fetchDogs" element={<Search isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}/>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated}/>}/>
        </Routes>
      </Router>
      <div className="footer">
      </div>
    </div>
    
  );
};

export default App;


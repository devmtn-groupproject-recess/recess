import React from 'react';
import routes from "./Routes";
import Navbar from "./Components/Navbar/Navbar"
import {HashRouter} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        {routes}
      </HashRouter>
    </div>
  );
}

export default App;

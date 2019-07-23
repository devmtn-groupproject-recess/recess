import React from 'react';
import routes from "./Routes";
import Navbar from "./Components/Navbar/Navbar"
import './App.css';

function App() {
  return (
    <div className="App">
     <Navbar />
     {routes}
    </div>
  );
}

export default App;

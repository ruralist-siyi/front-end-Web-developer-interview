import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
  Edit <code>src/App.js{count}</code> and save to reload.
        </p>
        <div
          className="App-link"
          onClick={() => {setCount((count) => {return ++count})}}
        >
          click
        </div>
      </header>
    </div>
  );
}

export default App;

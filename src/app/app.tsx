import * as React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          UI comes from <code>src/app.ts</code> to invest the dev environment.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TypeScript project environment setup
        </a>
      </header>
    </div>
  );
}

export default App;

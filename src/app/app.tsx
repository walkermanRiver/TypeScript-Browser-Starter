import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
// in order to import this log512, i create one image.d.ts file to declare the png module
import logo512 from "./logo512.png";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={logo512} className="App-logo512" alt="logo" />
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

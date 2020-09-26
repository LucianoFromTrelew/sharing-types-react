import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { APIIndexRouteResponse } from "./server";

function App() {
  const [msg, setMsg] = useState<string>();

  const fetchData = async () => {
    const res = await fetch("/api/v1");
    const json: APIIndexRouteResponse = await res.json();
    setMsg(json.message);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {msg && <code>{msg}</code>}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

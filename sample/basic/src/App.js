import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './Layout'
import { withContainer } from './react-jservice'
import registry from './registry'

function App(props) {
  console.log('App', props);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Layout />
      </header>
    </div>
  )
}

export default withContainer(App, registry);

import React, { Component } from 'react';
import './App.css';
import Global from './components/Global';


class App extends Component {

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SHops Manager </h1>
        </header>
         <Global></Global>
      </div>
    );
  }
}

export default App;

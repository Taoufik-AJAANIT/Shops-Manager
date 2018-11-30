import React, { Component } from 'react';
import './App.css';
import Container from './components/Container';


class App extends Component {

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SHops Manager </h1>
        </header>
         <Container></Container>
      </div>
    );
  }
}

export default App;

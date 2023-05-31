import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state  = {apiResponse: ""};
  }
  CallAPI(){
    fetch("http://localhost:9000/users")
      .then(res => res.text())
      .then(res => this.setState({apiResponse: res}));
  }
  componentWillMount(){
    this.CallAPI();
  }
  render(){
    return(
      <div className="App">
        <header className="App-header">
          <p>{this.state.apiResponse}</p>
        </header>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state  = {apiResponse: ""};
  }
 /* CallAPI(){
    fetch("http://localhost:9000/")
      .then(res => res.text())
      .then(res => this.setState({apiResponse: res}));
  }
  componentWillMount(){
    this.CallAPI();
  }*/
  render(){
    return(
      <div class="form">
      <form class="register-form">
        <input type="text" placeholder="name"/>
        <input type="password" placeholder="password"/>
        <input type="text" placeholder="email address"/>
        <button>create</button>
        <p class="message">Already registered? <a href="#">Sign In</a></p>
      </form>
      <form class="login-form">
        <input type="text" placeholder="username"/>
        <input type="password" placeholder="password"/>
        <button>login</button>
        <p class="message">Not registered? <a href="#">Create an account</a></p>
      </form>
    </div>
    );
  }
}

export default App;

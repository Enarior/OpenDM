import React, { Component } from "react";
import "./style/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
   CallAPI(){
    fetch("http://localhost:9000/")
      .then(res => res.text())
      .then(res => this.setState({apiResponse: res}));
  }
  componentWillMount(){
    this.CallAPI();
  }
  render() {
    console.log(this.state.apiResponse);
    if(this.state.apiResponse === "login"){
    return (
      <div className="App">
        <div class="form">
          <form class="register-form">
            <input type="text" placeholder="name" />
            <input type="password" placeholder="password" />
            <input type="text" placeholder="email address" />
            <button>create</button>
            <p class="message">
              Already registered? <a href="#">Sign In</a>
            </p>
          </form>
          <form class="login-form">
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <button>login</button>
            <p class="message">
              Not registered? <a href="#">Create an account</a>
            </p>
          </form>
        </div>
      </div>
    );
    }
    else if(this.state.apiResponse === "homeUser"){
      return("ca marche");
    }
  }
}

export default App;

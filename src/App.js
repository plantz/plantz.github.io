import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import './App.css';
import Gallery from './Gallery';

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.handleFBLogin = this.handleFBLogin.bind(this);
    const localKey = localStorage.getItem("accessKey")
    this.state = {
      accessToken:  (localKey && localKey !== 'undefined') ? localKey : null,
    }
  }
  handleFBLogin({ accessToken, ...resp }) {
    console.log(...resp)
    localStorage.setItem("accessKey",  accessToken);
    this.setState({ accessToken })
  }

  render() {
    return (
      <div className="App">
        <h2>Dakini Dankness Club Cocobongo Plant Emporium</h2>
        {!this.state.accessToken ? <FBLogin handleResponse={this.handleFBLogin} /> : <Gallery accessToken={this.state.accessToken} />}
      </div>
    );
  }
}

const FBLogin = ({ handleResponse }) => {
  console.log('fb login')
  return <FacebookLogin
    appId="107900016546566"
    autoLoad={true}
    fields="name,email,picture"
    callback={handleResponse}
    cssClass="button is-info"
    icon="fa-facebook"
  />
}

export default App;

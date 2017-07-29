import React, { Component } from 'react';
import graph from 'fbgraph';
import FacebookLogin from 'react-facebook-login';
import {
  FB_APP_ID,
  FB_GROUP_ID,
  FB_POSTS_QUERY
} from './config.json'
import './App.css';
import Gallery from './Gallery';

const FB_QUERY = `${FB_GROUP_ID}/${FB_POSTS_QUERY}`;


class App extends Component {
  constructor(props, context) {
    super(props, context)

    const localKey = localStorage.getItem("accessKey")
    this.state = {
      accessToken:  (localKey && localKey !== 'undefined') ? localKey : null,
      plant: null,
      plants: []
    }

    this.handleFBLogin = this.handleFBLogin.bind(this);
    this.getPlants = this.getPlants.bind(this);
  }
  getPlants() {
    if (!this.state.plants.length && this.state.accessToken) {
      graph.setAccessToken(this.props.accessToken);
      graph
        .get(FB_QUERY, (err, res) => {
          if (err) {
            console.log(err);
            this.setState({ accessToken: null })
          }
          else {
              this.setState({ plants: res.data })
          }

        });
        // setTimeout(()=> {
        //   graph
        //     .get(FB_QUERY, (err, res) => {
        //       this.setState({ plants: res.data })
        //     });
        // }, 60000)
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
        {/* {this.state.plant && <Plant plant={this.state.plant} /> } */}
        {!this.state.accessToken && <FBLogin handleResponse={this.handleFBLogin} />}
        {this.state.accessToken && this.state.plants && <Gallery accessToken={this.state.accessToken} plants={this.state.plants} getPlants={this.getPlants} />}
      </div>
    );
  }
}

const FBLogin = ({ handleResponse }) => {
  console.log('fb login')
  return <FacebookLogin
    appId={FB_APP_ID}
    autoLoad={true}
    fields="name,email,picture"
    callback={handleResponse}
    cssClass="button is-info"
    icon="fa-facebook"
  />
}

export default App;

import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import './App.css';
import Gallery from '../components/Gallery';
import graph from 'fbgraph';

import {
  FB_GROUP_ID,
  FB_POSTS_QUERY
} from '../config.json'

const FB_QUERY = `${FB_GROUP_ID}/${FB_POSTS_QUERY}`;

class App extends Component {
  constructor(props, context) {
    super(props, context)

    const localKey = localStorage.getItem("accessKey")
    this.state = {
      accessToken:  (localKey && localKey !== 'undefined') ? localKey : null,
      plant: null,
      plants: [],
      offset: 0,
      limit: 20
    }
    this.handleFBLogin = this.handleFBLogin.bind(this);
    this.getPlants = this.getPlants.bind(this);
    this.paginate = this.paginate.bind(this);
  }
  componentWillMount(){
    this.state.accessToken && !this.state.plants.length && this.getPlants({})
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.state.offset !== nextState.offset) {
      this.getPlants(nextState)
    }
  }
  handleFBLogin({ accessToken, ...resp }) {
   localStorage.setItem("accessKey",  accessToken);
   this.setState({ accessToken })
  //  dispatch({
  //    type: FB_LOGIN,
  //    payload: { accessToken, ...resp }
  //  })
  }
  getPlants({ limit = 20, offset = 0 }) {
    const query = `${FB_QUERY}&limit=${limit}&offset=${offset}`;
    graph.setAccessToken(this.state.accessToken);
    graph
      .get(query, (err, res) => {
        if (err) {
          localStorage.setItem("accessKey",  '');
          this.setState({ accessToken: null })
          // dispatch({
          //   type: PLANTS_FAIL,
          //   payload: { plants: res.data }
          // })
        }
        else {
          this.setState({ plants: res.data })
          // dispatch({
          //   type: PLANTS_SUCCESS,
          //   payload: { plants: res.data }
          // })
        }
      });
  }
  paginate(forward = true) {
    const offset = forward ? this.state.offset + this.state.limit : this.state.offset - this.state.limit;
    console.log(this.state.offset, offset);
    this.setState({ offset })
  }
  render() {
    return (
      <div className="App">
        <nav className="navbar is-transparent">
          <div className="navbar-brand"><a className="navbar-item" href="/"><h1 className="title">Plantz DB</h1></a></div>
          <div className="navbar-menu">
            <div className="navbar-start">
              {!!this.state.offset && (
                <a className="navbar-item" onClick={() => this.paginate(false)}>
                  {"< Prev"}
                </a>
              )}
            </div>
            <div className="navbar-end">
              <a className="navbar-item" onClick={this.paginate}>
                Next >
              </a>
            </div>
          </div>
        </nav>

        {/* {this.state.plant && <Plant plant={this.state.plant} /> } */}
        {!this.state.accessToken &&  <FBLogin handleResponse={this.handleFBLogin} />}
        {this.state.accessToken && !!this.state.plants.length && <Gallery accessToken={this.state.accessToken} plants={this.state.plants} getPlants={this.getPlants} />}
        {this.state.accessToken && !this.state.plants.length && <FontSpinner />}
      </div>
    );
  }
}

const FBLogin = ({ handleResponse }) => {
  console.log('fb login')
  return <FacebookLogin
    appId={process.env.REACT_APP_FB_APP_ID}
    autoLoad={true}
    fields="name,email,picture"
    callback={handleResponse}
    cssClass="button is-info"
    icon="fa-facebook"
  />
}

const FontSpinner = () => (
  <div style={{ textAlign: 'center', margin: '0 auto', width: '100%' }} className="icon">
    <i className="fa fa-spinner fa-pulse fa-5x"></i>
    <span className="sr-only">Loading...</span>
  </div>
);

const mapStateToProps = (state) => {
  return {
    // accessToken: state.account.accessToken
  }
}

const mapDispatchToProps = () => {

}

export default App;

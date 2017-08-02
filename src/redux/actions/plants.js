import graph from 'fbgraph';

import {
  FB_GROUP_ID,
  FB_POSTS_QUERY
} from '../config.json'

const FB_QUERY = `${FB_GROUP_ID}/${FB_POSTS_QUERY}`;

import {
  PLANTS_FAIL,
  PLANTS_SUCCESS
} from './actionTypes';

export const getPlants = () = (dispatch) => {
  if (!this.state.plants.length && this.state.accessToken) {
    graph.setAccessToken(this.state.accessToken);
    graph
      .get(FB_QUERY, (err, res) => {
        if (err) {
          // this.setState({ accessToken: null })
          dispatch({
            type: PLANTS_FAIL,
            payload: { plants: res.data }
          })
        }
        else {
          dispatch({
            type: PLANTS_SUCCESS,
            payload: { plants: res.data }
          })
        }
      });
  }
}

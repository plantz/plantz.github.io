import { FB_LOGIN } from './actionTypes';

export const handleFBLogin = ({ accessToken, ...resp }) = (dispatch) => {
  localStorage.setItem("accessKey",  accessToken);
  // this.setState({ accessToken })
  dispatch({
    type: FB_LOGIN,
    payload: { accessToken, ...resp }
  })
}

import LoginService from "../service/login";

// redux-thunk
// export const login = (userInfo) => (dispatch) => {
//   dispatch({ type: "REQUEST" });
//   LoginService.login(userInfo).then((res) => {
//     getMoreUserInfo(dispatch, res)
//   }, (err) => {
//     dispatch({ type: "LOGIN_FAILURE", payload: err });
//   })
// }


export const getMoreUserInfo = (dispatch, userInfo) => {
  LoginService.getMoreUserInfo(userInfo).then((res) => {
    dispatch({ type: "LOGIN_SUCCESS", payload: res });
  }, err => {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  })
}



export const login = userInfo => ({type: "LOGIN_SAGA", payload: userInfo});
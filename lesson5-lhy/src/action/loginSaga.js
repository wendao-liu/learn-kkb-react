// （thunk）异步请求 call
// （dispatch）更新状态 put

// takeEvery 监听
import { call, put, takeEvery } from "redux-saga/effects";
import LoginService from "../service/login";

function* loginhandle(action) {
  yield put({ type: 'REQUEST'})

  try {
    const res1 = yield call(LoginService.login, action.payload)
    const res2 = yield call(LoginService.getMoreUserInfo, res1)
    yield put({ type: 'LOGIN_SUCCESS', payload: res2 })
  } catch (e) {
    yield put({ type: 'LOGIN_FAILURE', payload: e })
  }
}


function* loginSaga() {
  yield takeEvery('LOGIN_SAGA', loginhandle)
}
export default loginSaga;

import React, { Component } from "react";
import store from "../store/";
import TeatA from './TeatA.js'
import TeatB from './TeatB.js'

export default class ReduxPage extends Component {
  componentDidMount() {
    // store发生变化之后，执行subscribe的监听函数
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    // 取消订阅
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  add = () => {
    // 修改状态
    store.dispatch({ type: "ADD" });
  };

  asyAdd = () => {
    // 模拟下异步数据请求
    // store.dispatch((dispatch, getState) => {
    //   setTimeout(() => {
    //     // console.log("getState", getState()); //sy-log
    //     dispatch({ type: "ADD" });
    //   }, 1000);
    // });

    store.dispatch(
      Promise.resolve({
        type: "MINUS",
        payload: 100
      })
    );
  };

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState().count}</p>
        <p>{store.getState().count1}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.asyAdd}>asy add</button>
        <TeatA></TeatA>
        <TeatB></TeatB>
      </div>
    );
  }
}

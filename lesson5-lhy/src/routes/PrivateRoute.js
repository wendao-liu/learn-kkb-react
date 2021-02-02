import React from 'react';
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux';

function PrivateRoute(props) {
  const { path, isLogin, component: Component, ...restProps } = props;
  return (
    <Route
      {...restProps}
      render={(p) => (
        isLogin
          ?
          <Component {...p} />
          :
          <Redirect to={{ pathname: '/login', state: { from: p.location.pathname } }} />
      )}
    >
    </Route>

  )
}
export default connect(({ user }) => ({ isLogin: user.isLogin }))(PrivateRoute)
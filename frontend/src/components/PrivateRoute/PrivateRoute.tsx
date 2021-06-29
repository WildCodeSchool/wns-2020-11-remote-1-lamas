import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';

const PrivateRoute = (props: {
  path: string;
  component:
    | React.ComponentType<any>
    | React.ComponentType<RouteComponentProps<any, StaticContext, unknown>>;
}) => {
  const { path, component } = props;
  const authToken = localStorage.getItem('token');

  if (!authToken) {
    return <Redirect to="/" />;
  }

  return <Route path={path} component={component} />;
};

export default PrivateRoute;

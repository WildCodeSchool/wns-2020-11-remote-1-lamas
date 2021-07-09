import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';

const PrivateRoute = (props: {
  exact: boolean;
  path: string;
  component:
    | React.ComponentType<any>
    | React.ComponentType<RouteComponentProps<any, StaticContext, unknown>>;
}) => {
  const { path, component, exact } = props;
  const authToken = localStorage.getItem('token');

  if (!authToken) {
    return <Redirect to="/" />;
  }

  return <Route exact={exact} path={path} component={component} />;
};

export default PrivateRoute;

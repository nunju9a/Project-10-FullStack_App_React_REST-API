import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './components/Context';

//provide a higher-order component to ensure that users are authenticated before
//permitting access to protected routes
const PrivateRoute = (props) => {
  const {
    component: Component,
    ...rest
  } = props;
  return (
    <Consumer>
      {
        context => (
          <Route
            {...rest}
            render={props =>
              context.authenticatedUser ?
                (<Component {...props} />)
                :
                (<Redirect
                  to={{
                    pathname: '/signin',
                    state: { from: props.location },
                  }}
                />)
            }
          />
      )}
    </Consumer>
  );
}

export default PrivateRoute;
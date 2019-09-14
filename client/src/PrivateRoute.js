// Setting up private route which only allows currently authenticated user to access
// Taken mostly from Treehouse React Authentication course

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './components/Context';

export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={
            props => context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location },// Redirect to current location
              }} />
            )
          }
        />
      )}
    </Consumer>
  );
};

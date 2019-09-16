// Component to render Header

import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  const { context } = props;
  const authUser = context.authenticatedUser;

  return(
    <div className="header">
      <div className="bounds">
        <h1 onClick={() => window.location.href = '/'} className="header--logo">Bayside High School Tigers  - Courses</h1>
        {/* Ternary operator shows "Welcome user" and "sign out" IF authorized user signed in
            Otherwise the "sign up" and "sign in" links will be shown*/
          authUser ?
          <nav>
            <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
            <NavLink className="signout" to="/signout">Sign Out</NavLink>
          </nav> :
          <nav>
            <NavLink
              className="signup"
              to={{
                pathname:'/signup',
                state: { from: props.location },
              }}
            >Sign Up</NavLink>

            <NavLink
              className="signin"
              to={{
                pathname:'/signin',
                state: { from: props.location },
              }}
            >Sign In</NavLink>
          </nav>
        }
      </div>
    </div>
  );
}
export default Header;
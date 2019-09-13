import React from 'react';
import { Redirect } from 'react-router-dom';

// Sign user out and redirect to courses
const UserSignOut = ({ context }) => {
  context.actions.signOut();
  return (
    <Redirect to="/" />
  );
}

export default UserSignOut;
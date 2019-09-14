//Component to sign out user
import React from 'react';
import { Redirect } from 'react-router-dom';

const UserSignOut = ({ context }) => {
    alert('Thanks for visiting - Hope to see you soon!');
    context.actions.signOut();
    return (
    <Redirect to="/" />
  );
}
export default UserSignOut;
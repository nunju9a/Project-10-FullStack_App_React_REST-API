//Component to render error page for unhandled errors

import React from 'react';
import { Link } from 'react-router-dom';

const UnhandledError = () => {
  return(
    <div className="bounds">
      <h1>Error</h1>
      <p>Sorry! An unexpected error has occurred.</p>
      <Link className="button button-secondary" to="/">Return to List</Link>
    </div>
  );
}
export default UnhandledError;
// Component to render Forbidden page

import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return(
    <div className="bounds">
      <h1>Forbidden</h1>
      <p>You are unauthorized to perform this action.</p>
      <Link className="button button-secondary" to="/">Return to List</Link>
    </div>
  );
}
export default Forbidden;
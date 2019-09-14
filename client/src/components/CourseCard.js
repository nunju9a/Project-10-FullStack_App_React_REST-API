// Component to hold each course in a card on main page
// Clickable with link to individual course page

import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = (props) => {
  return(
    <div className="grid-33">
      <Link className="course--module course--link" to={`/courses/${props.id}`}>
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{props.title}</h3>
      </Link>
    </div>
  );
}

export default CourseCard;

// Component holding each individual course details and handles delete

import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from "react-markdown";


class CourseDetail extends React.Component {

  // Initial state
  state = {
    course: [],
    isUserAuth: null,
  };

  // Fetch current course details
  async componentDidMount() {
    const res = await this.props.context.data.api(`/courses/${this.props.match.params.id}`, "GET");
    if (res.status === 200) {
      // Return course details if api responds with status 200
      return res.json().then(course => {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        let user = null;
        // Testing if user is authenticaed and course owner
        if(authUser && authUser.id === course[0].userId) {
          user = true;
        }
        
        this.setState({course: course, isUserAuth: user});
      });
    }else if (res.status === 404) { // Render not found page if status 404
      window.location.href = '/notfound';
    }else if (res.status === 500) { // Render unhandled error page if status 500
      window.location.href = '/error';
    }else {
      throw new Error();
    }
  }

  // Delete Handler
  handleDelete = async (e) => {
      const { context } = this.props;
      const authUser = context.authenticatedUser;
      const username = authUser.emailAddress;
      const password = authUser.password;

      // Confirmation alert
      if(window.confirm('Are you sure you want to delete this course ?')) {
        // DELETE request to the API
        const res = await context.data.api(`/courses/${this.props.match.params.id}`, "DELETE", null, true, { username, password });
        if (res.status === 204) {
          window.location.href = '/'; // Redirect to main page if status 204 returned
          return [];
        } else if (res.status === 401 || res.status === 403) { // Render forbidden page if status 401 or 403
          window.location.href = '/forbidden';
        } else {
          window.location.href = '/error'; // Render unhandled error page if any other status
        }
      }

  } 

  render() {
    
    const course = this.state.course[0];
    const user = this.state.isUserAuth;

    return(
      <div>
      { /* Ternary operator to render either the content or loading message */
        this.state.course.length ?
        <div>
          <div className="actions--bar">
            <div className="bounds">

              <div className="grid-100">
                  { /* Ternary operator to render either Update and Delete button if user the course owner*/
                    user ?
                    <span>
                    <Link className="button" to={`/courses/${this.props.match.params.id}/update`}>Update Course</Link>
                    <Link onClick={this.handleDelete} to='#' className="button">Delete Course</Link>
                    </span>
                    : null
                  }
                <Link className="button button-secondary" to="/">Return to List</Link>
              </div>
            </div>
          </div>

          <div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
                <p>By {course.user.firstName} {course.user.lastName}</p>
              </div>
              <div className="course--description">
               <ReactMarkdown source={course.description} />
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{course.estimatedTime}</h3>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <ul>
                    <ReactMarkdown source={course.materialsNeeded} />
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        :
        <h3>Please Hold...</h3>
      }
      </div>
    );
  } 
}

export default CourseDetail
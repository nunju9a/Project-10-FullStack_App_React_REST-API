import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Courses extends React.Component {
  state = {
    courses: [],
    isLoading: true,
  };

  componentDidMount() {
    //Fetching courses from api
    fetch(`http://localhost:5000/api/courses`)
      .then(response => response.json())
      .then(courses => this.setState({
        // Setting courses state
        courses: courses, 
        isLoading: false 
      }))
      .catch(err => this.props.history.push("/error")); 
  }

  // Render all courses
  render() {
    return (
      this.state.isLoading ? (<h2>Please Hold...</h2>) :
      <div className="bounds">
        {
          this.state.courses.map(course => {
            return (
              <div className="grid-33" key={course.id}>
                <Link to={`/courses/${course.id}`} className="course--module course--link">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                </Link>
              </div>
            );
          })
        }
        <div className="grid-33">
          <Link to="/courses/create" className="course--module course--add--module">
            <h3 className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px"
                y="0px" viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6"></polygon>
              </svg>
              New Course
            </h3>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Courses);
//Renders main page with all the courses
import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';

class Courses extends React.Component {
  // Initial state
  state = {
    courses: []
  }

  // FETCH courses from Api and set state
  async componentDidMount() {
    // GET request to the REST API
    const res = await this.props.context.data.api("/courses", "GET");
    // Return courses info if api returns status 200
    if (res.status === 200) {
      return res.json().then(courses => this.setState({courses: courses}));
    }else if (res.status === 500) {
      window.location.href = '/error'; // Render error page if status 500
    }else {
      throw new Error();
    }
  }

  render() {
    return (

      <div className="bounds">
        {/*Using map to iterate through each course and render a course card*/}
        {this.state.courses.map(course => <CourseCard title={course.title} key={course.id} id={course.id} />)}

        {/* Card specifically to create a new course*/}
        <div className="grid-33">
          <Link className="course--module course--add--module" to="/courses/create">
            <h3 className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course
            </h3>
          </Link>
        </div>
      </div>
    );
  }
}
export default Courses
import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import ReactMarkdown from 'react-markdown';

class CourseDetail extends React.Component {
  _isMounted = false;

  state = {
    course: "",
    isLoading: true,
  };

  componentDidMount() {
    
    this._isMounted = true;
    //attempt to fetch course information
    fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(response => {
        if(response.status === 404) {
          this.props.history.push("/notfound");
        }
        return response.json();
      })
      .then(course => {

        // Set course state if component mounted
        if(this._isMounted) { 
          this.setState({
            course: course[0],
            isLoading: false 
          })
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push("/error"); 
      })
  }

  //Unmount component to prevent memory leaks
  componentWillUnmount() {
    this._isMounted = false;
  }

  // Handle Deleting
  handleDelete = (e) => {
    e.preventDefault();
    // Get user state and credentials
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const credentials = btoa(`${authUser.emailAddress}:${authUser.password}`);
    // Set Delete options
    const options = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${credentials}`,
      },
    };
    // Authenticate User before deleting
    fetch(`http://localhost:5000/api/courses/${this.state.course.id}`, options)
      .then(response => {
        if(response.status === 401) {
          this.props.history.push("/forbidden"); // Forbidden - Not Authorized
        } else {
          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push("/error"); 
      });
  }

  // Render info for each course
  render() {
    const { context} = this.props;
    const authUser = context.authenticatedUser;
    return (
      this.state.isLoading ? (<h2>Please Hold For Course Info...</h2>) :
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              {
                (authUser && authUser.id === this.state.course.user.id) &&
                <span>
                  <Link to={`/courses/${this.state.course.id}/update`}
                    className="button">Update Course</Link>
                  <Link to="/" className="button"
                    onClick={this.handleDelete}>Delete Course</Link>
                </span>
              }
              <Link to="/" className="button button-secondary">Return to List</Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.course.title}</h3>
              <p>By {this.state.course.user.firstName} {this.state.course.user.lastName}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown source={this.state.course.description} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    {}
                    <ReactMarkdown source={this.state.course.materialsNeeded} />
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CourseDetail);
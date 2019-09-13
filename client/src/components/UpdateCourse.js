import React from 'react';

class UpdateCourse extends React.Component {
  _isMounted = false;

  state = {
    id: "",
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    user: {},
    isLoading: true,
    errors: [],
  };

  componentDidMount() {
    //set component mount status
    this._isMounted = true;
    //attempt to fetch course information
    fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(response => {
        if(response.status === 404) {
          this.props.history.push("/notfound"); //resource is non-existent
        }
        return response.json();
      })
      .then(course => {
        //only set course state if component is mounted
        if(this._isMounted) {
          this.setState({
            //set course state
            id: course[0].id,
            title: course[0].title,
            description: course[0].description,
            estimatedTime: course[0].estimatedTime,
            materialsNeeded: course[0].materialsNeeded,
            user: course[0].user,
            isLoading: false //no longer loading
          })
        }
      })
      .then(() => {
        //only redirect if component is mounted
        if(this._isMounted) {
          if(this.state.user.id !== this.props.context.authenticatedUser.id) {
            this.props.history.push("/forbidden"); //user is unauthorized, isn't the owner of the course
          }
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push("/error"); //there was an error, likely a server error
      })
  }

  //unmount the component, important for 404/not found error handling to prevent memory leaks
  componentWillUnmount() {
    this._isMounted = false;
  }

  //redirects user to the course list
  returnToDetail = (e) => {
    e.preventDefault();
    this.props.history.push(`/courses/${this.props.match.params.id}`);
  }

  //update course title state
  updateCourseTitle = (e) => {
    this.setState({ title: e.target.value });
  }

  //update course description state
  updateCourseDescription = (e) => {
    this.setState({ description: e.target.value });
  }

  //update course estimated time state
  updateCourseEstimatedTime = (e) => {
    this.setState({ estimatedTime: e.target.value });
  }

  //update course materials needed state
  updateCourseMaterialsNeeded = (e) => {
    this.setState({ materialsNeeded: e.target.value });
  }

  //submit handler
  handleSubmit = async (e) => {
    e.preventDefault();
    //obtain authenticated user state and credentials, and course state
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;
    const credentials = btoa(`${authUser.emailAddress}:${authUser.password}`);
    //attempt to perform a PUT request with course information, setting the necessary headers and the
    //request body to the course state
    const response = await fetch(`http://localhost:5000/api/courses/${this.state.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${credentials}`,
      },
      body: JSON.stringify({
        title,
        description,
        estimatedTime,
        materialsNeeded
      }),
    });
    if(response.status === 204) {
      this.props.history.push("/"); //request was successful
    } else if(response.status === 400) {
      const data = await response.json();
      this.setState({ errors: data.message.split(",") }); //user made a bad request
    } else if(response.status === 500) {
      this.props.history.push("/error"); //there was an error, likely a server error
    }
  }

  //render a course update form
  render() {
    let id = 1;
    return (
      this.state.isLoading ? (<h2>Loading Course Information...</h2>) :
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          {
            (this.state.errors.length > 0) &&
            <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  {
                    (this.state.errors.map(error => {
                      return (<li key={id++}>{error}</li>);
                    }))
                  }
                </ul>
              </div>
            </div>
          }
          <form onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input id="title" name="title" type="text"
                    className="input-title course--title--input"
                    placeholder="Course title..." value={this.state.title}
                    onChange={this.updateCourseTitle} />
                </div>
                <p>By {this.state.user.firstName} {this.state.user.lastName}</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea id="description" name="description" className=""
                    placeholder="Course description..."
                    value={this.state.description}
                    onChange={this.updateCourseDescription}>
                  </textarea>
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input id="estimatedTime" name="estimatedTime" type="text"
                        className="course--time--input" placeholder="Hours"
                        value={this.state.estimatedTime}
                        onChange={this.updateCourseEstimatedTime} />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea id="materialsNeeded" name="materialsNeeded"
                        className="" placeholder="List materials..."
                        value={this.state.materialsNeeded}
                        onChange={this.updateCourseMaterialsNeeded}>
                      </textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Update Course</button>
              <button className="button button-secondary" onClick={this.returnToDetail}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateCourse
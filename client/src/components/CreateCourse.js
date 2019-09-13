import React from 'react';

class CreateCourse extends React.Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: [],
  };

  //redirects the user to the course list
  returnToList = (e) => {
    e.preventDefault();
    this.props.history.push("/");
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
    //const { context } = this.props;
    //obtain authenticated user state and credentials and course state
    const authUser = this.props.authenticatedUser;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;
    const credentials = btoa(`${authUser.emailAddress}:${authUser.password}`);
    //attempt to create a course via POST request with proper headers and course state info in the request body
    const response = await fetch(`http://localhost:5000/api/courses`, {
      method: "POST",
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
    if(response.status === 201) {
      this.props.history.push("/"); //successful request
    } else if(response.status === 400) {
      const data = await response.json();
      this.setState({ errors: data.message.split(",") }); //user made a bad request, likely omitted required fields
    } else if(response.status === 500) {
      this.props.history.push("/error"); //there was an error, likely a server error
    }
  }

  //render course creation form
  render() {
    let id = 1;
    //const { context } = this.props;
    const authUser = this.props.authenticatedUser;
    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
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
                    onChange={this.updateCourseTitle}/>
                </div>
                {/*Need to put authenticated user's name in the following <p> tag*/}
                {/* <p>By {authUser.firstName} {authUser.lastName}</p> */}
              </div>
              <div className="course--description">
                <div>
                  <textarea id="description" name="description" className=""
                    placeholder="Course description..." value={this.state.description}
                    onChange={this.updateCourseDescription}></textarea>
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
                        value={this.state.estimatedTime} onChange={this.updateCourseEstimatedTime} />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea id="materialsNeeded" name="materialsNeeded"
                        className="" placeholder="List materials..."
                        value={this.state.materialsNeeded}
                        onChange={this.updateCourseMaterialsNeeded}></textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Create Course</button>
              <button className="button button-secondary" onClick={this.returnToList}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default CreateCourse;
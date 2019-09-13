import React from 'react';

class CreateCourse extends React.Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: [],
  };

  
  returnToList = (e) => {
    e.preventDefault();
    this.props.history.push("/");
  }

  
  updateCourseTitle = (e) => {
    this.setState({ title: e.target.value });
  }

  updateCourseDescription = (e) => {
    this.setState({ description: e.target.value });
  }

  updateCourseEstimatedTime = (e) => {
    this.setState({ estimatedTime: e.target.value });
  }

  updateCourseMaterialsNeeded = (e) => {
    this.setState({ materialsNeeded: e.target.value });
  }

 
  handleSubmit = async (e) => {
    e.preventDefault();
    const authUser = this.props.authenticatedUser;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;
    const credentials = btoa(`${authUser.emailAddress}:${authUser.password}`);
    // Attempting post request to create new course
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
      this.props.history.push("/");
    } else if(response.status === 400) {
      const data = await response.json();
      this.setState({ errors: data.message.split(",") });
    } else if(response.status === 500) {
      this.props.history.push("/error");
    }
  }

  //Render Create Course form
  render() {
    let id = 1;
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
                {}
                <p>By {authUser.firstName} {authUser.lastName}</p>
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
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//import statements for project components
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
//import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';

class App extends React.Component {
  state = {
    url: `http://localhost:5000/api`
  }

  // Render main component
  render() {
    return (
        <BrowserRouter>
        <div id="root">
          <div>
            <Header/>
            <hr />
            <Switch>
              {/*Homepage/Course List Route*/}
              <Route
                exact path="/"
                render={ () => <Courses url={this.state.url} /> }
              />
              {/*Create Course Route*/}
              <Route
                path="/courses/create"
                component={CreateCourse}
                url={this.state.url}
              />
              {/*Course Update Route*/}
              {/* <Route
                path="/courses/:id/update"
                component={UpdateCourse}
              /> */}
              {/*Course Details Route*/}
              <Route
                path="/courses/:id"
                render={ props =>
                  <CourseDetail
                    {...props}
                    url={this.state.url}
                  />
                }
              />
              {/*User Sign-Up Route*/}
              <Route path="/signup" component={UserSignUp} />
              {/*User Sign-In Route*/}
              <Route path="/signin" component={UserSignIn} />
              {/*User Sign-Out Route*/}
              <Route path="/signout" component={UserSignOut} />
             {/* <Route component={NotFound} /> */}
            </Switch>
          </div>
        </div>
        </BrowserRouter>
    );
  }
}

export default App;
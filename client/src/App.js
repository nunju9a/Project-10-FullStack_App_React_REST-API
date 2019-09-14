import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Importing components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

// Importing component for routes that are only accessible to authorized users
import PrivateRoute from './PrivateRoute';

// Importing functionality that wraps components in context
import withContext from './components/Context';

// Giving components context
const HeaderContext = withContext(Header);
const CoursesContext = withContext(Courses);
const CourseDetailContext = withContext(CourseDetail);
const UserSignUpContext = withContext(UserSignUp);
const UserSignInContext = withContext(UserSignIn);
const UserSignOutContext = withContext(UserSignOut);
const CreateCourseContext = withContext(CreateCourse);
const UpdateCourseContext = withContext(UpdateCourse);

// App class holding all routes
class App extends React.Component {

  render() {

    return (
      <BrowserRouter>
        <div>
             {/*Rendering Header which will stay throughout all routes*/}
             <Route render={({location})=> <HeaderContext location={location.pathname} />} />
          <Switch>
              {/*Rendering main page which will display all courses*/}
              <Route exact path='/' component={ CoursesContext } />

              {/*Rendering create course page - only accessible to authorized user*/}
              <PrivateRoute path='/courses/create' component={ CreateCourseContext }  />

              {/*Rendering update course course page - only accessible to authorized user*/}
              <PrivateRoute path='/courses/:id/update' component={ UpdateCourseContext }/>

              {/*Rendering individual course page which will display course with all details*/}
              <Route path='/courses/:id' component={ CourseDetailContext } />

              {/*Rendering sign-In page*/}
              <Route path='/signin' component={ UserSignInContext } />

              {/*Rendering sign-Up page*/}
              <Route path='/signup' component={ UserSignUpContext } />

              {/*Rendering sign-Out component*/}
              <Route path='/signout' component={ UserSignOutContext } />

              {/*Rendering forbidden page for unauthorized users*/}
              <Route path='/forbidden' component={ Forbidden } />

              {/*Rendering error page for any unhandled errors/500 status*/}
              <Route path='/error' component={ UnhandledError } />
              
              {/*Rendering not found page*/}
              <Route component={ NotFound } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  } 
} 
export default App
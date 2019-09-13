import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
// import withContext func that wraps a component in context
import withContext from './components/Context';
// HOC functional component that wraps an instance of the <Route/> component
// used for making some routes that require authentication private
//import PrivateRoute from './PrivateRoute';

// components with Context
const HeaderContext = withContext(Header);
const CoursesContext = withContext(Courses);
const CourseDetailContext = withContext(CourseDetail);
const UserSignUpContext = withContext(UserSignUp);
const UserSignInContext = withContext(UserSignIn);
const UserSignOutContext = withContext(UserSignOut);
const CreateCourseContext = withContext(CreateCourse);
const UpdateCourseContext = withContext(UpdateCourse);


class App extends React.Component {

  render() {

    return (
      <BrowserRouter>
        <div>
             {/*Header always showing, location extracted and passed down as props*/}
             <Route render={({location})=> <HeaderContext location={location.pathname} />} />
          <Switch>
              <Route exact path='/' component={ CoursesContext } />
              {/* <Route path='/courses' component={CoursesContext}/> */}

              {/*<Route  path='/courses/create' component={ CreateCourse } />*/}
              <Route path='/courses/create' component={ CreateCourseContext }  />

              {/*<Route path='/courses/:id/update' component={ UpdateCourse } />*/}
              <Route path='/courses/:id/update' component={ UpdateCourseContext }/>

              <Route path='/courses/:id' component={ CourseDetailContext} />
              <Route path='/signin' component={ UserSignInContext } />
              <Route path='/signup' component={ UserSignUpContext } />
              <Route path='/signout' component={ UserSignOutContext } />

              <Route path='/forbidden' component={ Forbidden } />
              <Route path='/error' component={ UnhandledError } />
              <Route component={ NotFound } />
          </Switch>
        </div>
      </BrowserRouter>
    );

  } // end render
} // end App

export default App
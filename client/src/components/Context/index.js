import React from 'react';
import Cookies from 'js-cookie';

const UserContext = React.createContext();

export class Provider extends React.Component {
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
  };

  //signs the user up for the site, takes a user object as a parameter
  signUp = async (user) => {
    //create a new user with a POST request, attaching the necessary headers and the user's information
    const response = await fetch(`http://localhost:5000/api/users`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(user),
    });
    if(response.status === 201) {
      return []; //don't return anything if the request is successful
    } else if(response.status === 400) {
      return response.json().then(data => {
        const errorMessages = data.message.split(",");
        return errorMessages; //user made a bad request
      });
    } else if(response.status === 500) {
      this.props.history.push("/error"); //there was a server error during the request
    }
  }

  //signs the user in to the site, authenticating them
  signIn = async (emailAddress, password) => {
    //make sure to obtain the user's credentials
    const credentials = btoa(`${emailAddress}:${password}`);
    //make a GET request and fetch the corresponding user information
    const user = await fetch(`http://localhost:5000/api/users`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${credentials}`,
      },
    });
    if(user.status === 200) {
      return user.json().then(data => data); //request was successful, obtain user info
    } else if(user.status === 401) {
      return null; //user is unauthorized
    } else if(user.status === 500) {
      this.props.history.push("/error"); //there was a server error during the request
    }
  }

  //sign the user out and make them un-authenticated
  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser'); //remove their info from cookies
  }

  //set the authenticated user to the global state so that other routes can verify authenticated status
  setAuthenticatedUser = (authUser) => {
    Cookies.set('authenticatedUser', JSON.stringify(authUser), { expires: 1 }); //set user info to a cookie
    this.setState({ authenticatedUser: Cookies.getJSON('authenticatedUser') }); //update state
  }

  //provide the authenticated user as well as signUp(), signIn(), signOut()
  //and setAuthenticatedUser() as actions through context
  render() {
    return (
      <UserContext.Provider value={{
        authenticatedUser: this.state.authenticatedUser,
        actions: {
          signUp: this.signUp,
          signIn: this.signIn,
          signOut: this.signOut,
          setAuthenticatedUser: this.setAuthenticatedUser,
        },
      }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export const Consumer = UserContext.Consumer;

//subscibe a given component to the global state/application context
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <UserContext.Consumer>
        {context => <Component {...props} context={context} /> }
      </UserContext.Consumer>
    );
  }
}
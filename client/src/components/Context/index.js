//Taken mostly from Treehouse React Authentication course

import React from 'react';
import Data from '../../Data';
import Cookies from 'js-cookie';

// Creating Context which will allow Provider and Consumer objects to be exported
const AppContext = React.createContext();

export class Provider extends React.Component {

 state = {
   authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
 }

 constructor() {
   super();
   // Creating new instance of Data class
   this.data = new Data();
 }


  // Sign-in function which authenticates user and sets state
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      
    Cookies.set('authenticatedUser', JSON.stringify(user[0]), { expires: 1 });

    }
    return user;
  }

  // Sign-out function which removes cookie and authenticated state
  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
      };
    });
    Cookies.remove('authenticatedUser');
  }


  render() {

  const { authenticatedUser } = this.state;
  // Authenticated users data passed down as props to Provider
  const value = {
    authenticatedUser,
    data: this.data,
    actions: {
      signIn: this.signIn,
      signOut: this.signOut
    }
  }

  return(
    <AppContext.Provider value={value} >
      {this.props.children}
    </AppContext.Provider>
  );
} 
} 

export const Consumer = AppContext.Consumer;

// Higher-order component that wraped components in Context Consumer component
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <AppContext.Consumer>
        {context => <Component {...props} context={context} />}
      </AppContext.Consumer>
    );
  }
}
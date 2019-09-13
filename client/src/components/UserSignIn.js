import React from 'react';

import { Link } from 'react-router-dom';

class UserSignIn extends React.Component {
  state = {
    emailAddress: "",
    password: "",
  };

  //Redirect to courses
  returnToList = (e) => {
    e.preventDefault();
    this.props.history.push("/");
  }

  //Set state to updated email address
  updateUserEmailAddress = (e) => {
    this.setState({ emailAddress: e.target.value });
  }

  //Set state to updated password
  updateUserPassword = (e) => {
    this.setState({ password: e.target.value });
  }

  
  handleSubmit = (e) => {
    e.preventDefault();
    //Getting state from previous path
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    //Sign in user with current credentials
    this.props.actions.signIn(this.state.emailAddress, this.state.password)
      .then(user => {
        if(user !== null) {
          user.password = this.state.password;
          this.props.actions.setAuthenticatedUser(user); // User's state is authenticated throughout
          this.props.history.push(from); //Redirect to previous route
        } else {
          this.props.history.push("/forbidden"); // Redirect to forbidden route
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push("/error"); 
      });
  }

  //Render sign in form
  render() {
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" className=""
                  placeholder="Email Address" value={this.state.emailAddress}
                  onChange={this.updateUserEmailAddress} />
              </div>
              <div>
                <input id="password" name="password" type="password" className=""
                  placeholder="Password" value={this.state.password}
                  onChange={this.updateUserPassword} />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onClick={this.returnToList}>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
    );
  }
}
export default UserSignIn;
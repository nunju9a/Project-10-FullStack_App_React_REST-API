import React from 'react';
import { Link } from 'react-router-dom';

class UserSignUp extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmationPassword: "",
    isConfirmed: false,
    errors: [],
  };

  //Redirects to courses
  returnToList = (e) => {
    e.preventDefault();
    this.props.history.push("/");
  }

  
  updateUserFirstName = (e) => {
    this.setState({ firstName: e.target.value });
  }

  
  updateUserLastName = (e) => {
    this.setState({ lastName: e.target.value });
  }

  
  updateUserEmailAddress = (e) => {
    this.setState({ emailAddress: e.target.value });
  }

  
  updateUserPassword = async (e) => {
    await this.setState({ password: e.target.value });
    // Checking if password and confirm password match
    if(this.state.confirmationPassword === this.state.password) {
      this.setState({ isConfirmed: true });
    } else {
      this.setState({ isConfirmed: false });
    }
  }

  
  updateConfirmationPassword = async (e) => {
    
    await this.setState({ confirmationPassword: e.target.value });
    // Checking if password and confirm password match
    if(this.state.confirmationPassword === this.state.password) {
      this.setState({ isConfirmed: true }); 
    } else {
      this.setState({ isConfirmed: false });
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    // Storing state and previous location
    const { context } = this.props;
    const { firstName, lastName, emailAddress, password } = this.state;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    // Sign up to site with all credentials
    context.actions.signUp({ firstName, lastName, emailAddress, password })
      .then(errors => {
        if(errors.length) {
          this.setState({ errors }); 
        } else {
          
          context.actions.signIn(emailAddress, password)
            .then(user => {
              user.password = password;
              context.actions.setAuthenticatedUser(user); // User's state is authenticated throughout
              this.props.history.push(from); // Redirect to previous path
            })
            .catch(err => {
              console.log(err);
              this.props.history.push("/forbidden"); //the user is unauthorized
            })
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push("/error"); // Redirect to forbidden route
      });
  }

  // Render sign up form
  render() {
    let id = 1;
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          {
            (this.state.errors.length > 0) &&
            <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  {
                    this.state.errors.map(error => {
                      return (<li key={id++}>{error}</li>);
                    })
                  }
                  {
                    (!this.state.isConfirmed) && <li>Passwords must match for confirmation</li>
                  }
                </ul>
              </div>
            </div>
          }
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input id="firstName" name="firstName" type="text" className=""
                  placeholder="First Name" value={this.state.firstName}
                  onChange={this.updateUserFirstName} />
              </div>
              <div>
                <input id="lastName" name="lastName" type="text" className=""
                  placeholder="Last Name" value={this.state.lastName}
                  onChange={this.updateUserLastName} />
              </div>
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
              <div>
                <input id="confirmPassword" name="confirmPassword" type="password"
                  className="" placeholder="Confirm Password" value={this.state.confirmationPassword}
                  onChange={this.updateConfirmationPassword} />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onClick={this.returnToList}>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
      </div>
    );
  }
}

export default UserSignUp;
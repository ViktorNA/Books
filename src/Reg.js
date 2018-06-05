import React, { Component } from "react";
import withFirebaseAuth from "react-auth-firebase";
import firebase from "./firebase";
import Home from "./All";
import store from "./store"
import Notifications, {notify} from 'react-notify-toast'
import './assets/css/All.css'
import './assets/css/App.css'

class Reg extends Component {
  state = {
    email: `test@test.com`,
    password: '',
    reppassword: ''
  };
  render() {
    const {
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signInWithFacebook,
      signInWithGithub,
      signInWithTwitter,
      googleAccessToken,
      facebookAccessToken,
      githubAccessToken,
      twitterAccessToken,
      twitterSecret,
      user,
      error,
      signOut
    } = this.props;
    const { email, password } = this.state;
    if (user) {
        store.dispatch({
          type: 'SET_AUTH',
          auth: true});

      return(
         <Home user={user} error={error} signOut={signOut} />
      );
    }
    return (
      <div className="divAll">
        <div className="searchForm">
                  <div>
                    <form onSubmit={e => e.preventDefault()}>
                      <input
                        type="text"
                        placeholder="Email"
                        onChange={e => this.setState({ email: e.target.value })}
                      />{" "}
                      <br />

                      <input
                        type="password"
                        placeholder="Password"
                        onChange={e => this.setState({ password: e.target.value })}
                      />
                      <br />
                      {!user && (
                        <button className="button"
                          type="submit"
                          onClick={() => signInWithEmail(email, password)}
                        >
                          SignIn
                        </button>
                      )}
                    </form>
                    <form onSubmit={e => e.preventDefault()}>
                      <input
                        type="text"
                        placeholder="Email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                        title="test@email.com"
                        onChange={e =>
                          this.setState({
                            email: e.target.value
                          })
                        }
                        value={email}
                      />{" "}
                      <br />
                      <input
                        type="password"
                        placeholder="Password"
                        pattern=".{8,}"
                        title="8 or more characters"
                        onChange={e => this.setState({ password: e.target.value })}
                        value={password}
                      />{" "}
                      <br />
                      <input
                        type="password"
                        placeholder="Repeat password"
                        onChange={e => this.setState({ reppassword: e.target.value })}
                        value={this.state.reppassword}
                      />{" "}
                      <br />
                        <button className="button"
                          type="submit"
                          onClick={() => {
                            if(this.state.password===this.state.reppassword)
                              signUpWithEmail(email, password)
                            else
                              notify.show("Passwords must match!", "warning", 3000)}}>
                          SignUp
                        </button>
                    </form>
                    <br />
                    <form>
                      <button className="button" onClick={signInWithGoogle}>Signin with Google</button> <br />
                      <button className="button" onClick={signInWithGithub}>Signin with Github</button> <br />
                      <button className="button" onClick={signInWithTwitter}>Signin with Twitter</button> <br />
                    </form>
                  </div>
            </div>
        </div>
    );
  }
}

const authConfig = {
  email: {
    verifyOnSignup: false,
    saveUserInDatabase: true
  },
  google: {
    // scopes: ["admin.datatransfer", "contacts.readonly"], // optional
    // customParams: {
    //   login_hint: "user@example.com"
    // },
    // redirect: true, // default is popup: true, redirect: true,
    returnAccessToken: true,
    // scopes: [], // array
    saveUserInDatabase: true
  },
  facebook: {
    // scopes: ["admin.datatransfer", "contacts.readonly"], // optional
    // customParams: {
    //   login_hint: "user@example.com"
    // },
    redirect: true, // default is popup: true, redirect: true,
    returnAccessToken: true,
    saveUserInDatabase: true
  },
  github: {
    // redirect: true,
    returnAccessToken: true,
    saveUserInDatabase: true
  },

  twitter: {
    // redirect: true,
    returnAccessToken: true,
    returnSecret: true,
    saveUserInDatabase: true
  }
};

// export default App;
export default withFirebaseAuth(Reg, firebase, authConfig);

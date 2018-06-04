import React from "react";
import withAuthFirebase from "react-auth-firebase";
import firebase from "./firebase";
import App from "./App";

const Home = props => {
  console.log(props);
  const { user, signOut, error } = props;
  if (!user) {
    return <App />;
  }
  return (
    <div>
      <h1>Hello</h1>
      <button onClick={signOut}>Sign Out</button>
      {user ? <pre>{JSON.stringify(user, null, 2)}</pre> : null}
      {error ? <h1>{error.message}</h1> : null}
    </div>
  );
};

export default Home;

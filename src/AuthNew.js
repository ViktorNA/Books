import React, { Component } from 'react';
import store from './store.js'
import './assets/css/All.css'
import {v4} from 'node-uuid'
import {changeLoad} from './actions/actionTypes'
import withFirebaseAuth from "react-auth-firebase";
import firebase from "./firebase";
import {loadState, saveState} from './localStorage';


class AuthNew extends Component {
  constructor(props){
    super(props);
    const {
      user,
      error,
      signOut
    } = this.props;
    this.state={
      books: [],
      authenticated: false,
      cart: [{
        item:{
          name: 'empty',
          author:'also',
          price: 0
        },
        numb: 0
      }]
    };
    this.showCart = this.showCart.bind(this);
    this.coast = this.coast.bind(this);
    this.listener = this.listener.bind(this);
  }

  componentDidMount() {
    this.listener();
    store.subscribe(this.listener);
};

  componentWillUnmount(){
    store.subscribe(this.listener);
  }

  componentDidUpdate(){
  }

  listener(){
    saveState(store.getState());
    this.setState({
      cart: store.getState().cart,
      authenticated: store.getState().auth
    })
  }

  showCart(){
      return (
          <button className="cart" onClick={() => this.props.history.push("/cart/")}><span>Cart ({this.coast()}$)</span></button>

      );
    }

  coast(){
        let coast = 0;
        for (var i = 0; i < this.state.cart.length; i++) {
          coast+=Number(this.state.cart[i].item.price);
        }
        return coast;
    }

  render() {
    if (this.props.user) {
      return(
        <div className="Auth">
          <button className="button zoom signout log" onClick={() => {
            store.dispatch({
                type: 'SET_AUTH',
                auth: false})
            this.props.signOut()
          }
            }>Sign Out</button>
          {this.showCart()}
        </div>
      );
    }
    return (
      <div className="Auth">
        <button className="button zoom log" onClick={() => this.props.history.push("/reg")} ><span>Sign Up/Sign In</span></button>
        {this.showCart()}
      </div>
    );
  }

}
const authConfig = {
};
export default withFirebaseAuth(AuthNew, firebase, authConfig);

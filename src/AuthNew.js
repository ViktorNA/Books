import React, { Component } from 'react';
import axios from 'axios';
import store from './store.js'
import './assets/css/All.css'
import withFirebaseAuth from "react-auth-firebase";
import firebase from "./firebase";
import {saveState} from './localStorage';
import './assets/css/Auth.css'


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
      randBook: {
        id: '',
        description: 'Loading'
      },
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
    this.showCompare = this.showCompare.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.coast = this.coast.bind(this);
    this.listener = this.listener.bind(this);
  }

  componentDidMount() {
    this.listener();
    store.subscribe(this.listener);
    axios.get('/rand')
    .then(res =>{
      this.setState({
        randBook: {
          id: res.data.book._id,
          description: res.data.book.description._text
        }
      })
    })
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

  showCompare(){
    return <button className="cart" onClick={() => this.props.history.push("/compare")} ><span>Compare({store.getState().compare.length})</span></button>;
  }

  showLogin(){
    if (this.props.user) {
      return (
        <button className="cart" onClick={() => {
          store.dispatch({
              type: 'SET_AUTH',
              auth: false})
          this.props.signOut()
        }
          }>Sign Out</button>
      );
    }
    else {
      return (
          <button className="cart" onClick={() => this.props.history.push("/reg")} ><span>Sign Up/Sign In</span></button>
      );
    }
  }

  render() {
      return(
        <div className="Auth">
          <div className="authU">
            <button className="logoButton" onClick={() => this.props.history.push("/reg")}><span>Books</span></button>
            <div onClick={() => this.props.history.push("one/" + this.state.randBook.id)} className="randBook">
              <p className="text">Random book:</p>
              <p className="description">{this.state.randBook.description}</p>
            </div>
          </div>
          <div className="authB">
            {this.showLogin()}
            {this.showCart()}
            {this.showCompare()}
          </div>
        </div>
      );
  }
}
const authConfig = {
};
export default withFirebaseAuth(AuthNew, firebase, authConfig);

import React, { Component } from 'react';
import axios from 'axios';
import store from './store.js'
import './assets/css/Auth.css'
import { withRouter } from "react-router-dom";
import Notifications, {notify} from 'react-notify-toast';
import {loadState, saveState} from './localStorage';

class Auth extends Component {
  constructor(props){
    super(props);
    this.state={
      username: "",
      password: "",
      email: "",
      reppassword: "",
      isAuthenticated: false,
      authStep: 0,
      cart: [{
        item:{
          name: 'empty',
          author:'also',
          price: 0
        },
        numb: 0
      }],
      coast: 0
    }
    this.authentication = this.authentication.bind(this);
    this.searchChanged = this.searchChanged.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signout = this.signout.bind(this);
    this.signup = this.signup.bind(this);
    this.signupForm = this.signupForm.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.checkPasswords = this.checkPasswords.bind(this);
    this.showCart = this.showCart.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.coast = this.coast.bind(this);
    this.goToCart = this.goToCart.bind(this);
  }


  componentDidMount(){
    this.isAuthenticated();
    this.unsubscribe = store.subscribe(() => {
      saveState(store.getState());
      console.log(store.getState());
      this.setState({
        cart: store.getState().cart
      })
  });
  }

  componentWillUnmount(){
    this.unscribe();
  }

  searchChanged(event) {
    this.setState({ [event.target.name]: event.target.value });
  }



  authentication(){
    console.log('auth');
    const params = new URLSearchParams();
    params.set('username', this.state.username);
    params.set('password', this.state.password);
    axios.post("/login", params)
    .then(res => {
      this.isAuthenticated();
    })
  }

  isAuthenticated(){
    axios.get('/home')
    .then(res => {
      console.log(res.data.answer);
      this.setState({isAuthenticated: res.data.answer})
      store.dispatch({
        type: 'SET_AUTH',
        auth: res.data.answer})
    })
  }

  signout(){
    axios.get('/signout')
    .then(res => {
      this.isAuthenticated();
    })
  }

  signup(){
    console.log('auth');
    const params = new URLSearchParams();
    if (this.state.username.length<5) {
      notify.show("Username length must be 5 charapters or more!", "warning", 3000);
      return 0;
    }
    if (this.state.email.length<10) {
      notify.show("Uncorrect email!", "warning", 3000);
      return 0;
    }
    if (this.state.password.length<8) {
      notify.show("Password length must be 8 charapters or more!", "warning", 3000);
      return 0;
    }
    if (this.state.password!=this.state.reppassword) {
      notify.show("Passwords must mutch!", "warning", 3000);
      return 0;
    }
    console.log('SingnUp');
    params.set('username', this.state.username);
    params.set('password', this.state.password);
    params.set('email', this.state.email);
    axios.post("/signup", params)
    .then(res =>{
      console.log(res);
      this.setState({isAuthenticated: res.data.answer})
    })
  }

  nextStep(){
    this.setState({
      authStep: this.state.authStep + 1
    })
  }

  prevStep(){
    this.setState({
      authStep: this.state.authStep - 1
    })
  }

  checkPasswords(){
    if(this.state.password!=this.state.reppassword)
      return (
          <p className="warning">Passwords must mutchsign</p>
        );
    if (this.state.password.length<8) {
      return (
        <p className="warning">Password length must be 8 charapters or more</p>
      );
    }
  }

  checkUser(){
    if (this.state.username.length < 5) {
      return (
        <p className="warning">Username must 5 charapters or more</p>
      );
    }
    else if (this.state.email.length < 10) {
      return (
        <p className="warning">Uncorrect email</p>
      );
    }
    }


  signupForm(){
    switch (this.state.authStep) {
      case 0:{
        return (
          <div className="signupForm">
                <input type="text" name="username" value={this.state.username} onChange={this.searchChanged} placeholder="Username"/>
                <input type="password" name="password" value={this.state.password} onChange={this.searchChanged} placeholder="Password"/>

            <button  className="button zoom signin" onClick={this.authentication} ><span>Signin</span></button>
            <button  className="button zoom signup" onClick={this.nextStep} ><span>Signup</span></button>
          </div>
          );
      }; break;
      case 1:{
        return (
          <div className="signupForm">
              <input type="text" name="username" value={this.state.username} onChange={this.searchChanged} placeholder="Username"/>

              <input type="text" name="email" value={this.state.email} onChange={this.searchChanged} placeholder="E-mail"/>


          <button  className="button back" onClick={this.prevStep} ><span>Back</span></button>
          <button  className="button next" onClick={this.nextStep} ><span>Next</span></button>
          {this.checkUser()}
          </div>
        );
      };  break;
      case 2:{
        return (
          <div className="signupForm">
              <input type="password" name="password" value={this.state.password} onChange={this.searchChanged} placeholder="Enter password"/>

              <input type="password" name="reppassword" value={this.state.reppassword} onChange={this.searchChanged} placeholder="Repeat password"/>

          <button className="button back" onClick={this.prevStep} ><span>Back</span></button>
          <button  className="button next" onClick={this.signup} ><span>Next</span></button>
          {this.checkPasswords()}

          </div>
        );
      };  break;

      default:

    }
  }

  showCart(){
      return (
          <button className="cart" onClick={this.goToCart}><span>Cart ({this.coast()}$)</span></button>

      );
    }

  goToCart(){
    this.props.history.push("/cart/");
  }


  coast(){
      let coast = 0;
      for (var i = 0; i < this.state.cart.length; i++) {
        coast+=Number(this.state.cart[i].item.price);
      }
      return coast;
  }

  deleteItem(event){
    this.setState({
      cart: this.state.cart.splice(event.target.id, 1)
    });


    store.dispatch({
      type: 'UPDATE_CART',
      item: this.state.cart
    })
  }


  render() {
    if(!this.state.isAuthenticated)
      return (

        <div className="Auth">
          {this.signupForm()}
          {this.showCart()}
        </div>
      )
    else {
      return (
      <div className="Auth">
        <h1>You are logged</h1>
        <button className="button zoom signout" onClick={this.signout} ><span>signout</span></button>

        {this.showCart()}

      </div>
      )
    }
  }
}

export default Auth;

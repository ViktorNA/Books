import React, { Component } from 'react';
import axios from 'axios';
import store from './store.js'
import { Router } from 'react-router';
import "./assets/css/One.css"
import "./assets/css/App.css"
import { addBook, addComp } from './actions/actionTypes'
import Notifications, {notify} from 'react-notify-toast'

class One extends Component {
  constructor(props){
    super(props);
    this.state={
      oneBook: {},
      isAuthenticated: false
    };
    this.goback = this.goback.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.updateAuth = this.updateAuth.bind(this);
    this.toCompare = this.toCompare.bind(this);
  }


  componentDidMount(){
    axios.get(this.props.location.pathname)
    .then(res => {
      console.log(res);
      this.setState({oneBook: res.data.book})
    })
    store.subscribe(this.updateAuth)
    window.scrollTo(0,0);
  }

  componentWillUnmount(){
    (unscribe => store.subscribe(this.updateAuth));
  }

  updateAuth(){
    console.log('Auth has updated');
    this.setState({isAuthenticated: store.getState().auth})
  }

  addToCart(){
    if(this.state.oneBook.store){
      let book ={
        id: this.state.oneBook.id,
        name: this.state.oneBook.name,
        author: this.state.oneBook.author,
        price: this.state.oneBook.price
      }

      store.dispatch(addBook(book))
      console.log('cart one');
      console.log(store.getState().cart);
      notify.show("The book has been added!", "success", 3000)
    }
    else {
      notify.show("The book is out of stock!", "warning", 3000)
    }
  }

  goback(){
    this.props.history.goBack();
  }

  toCompare(){
    if (store.getState().compare.length<1) {
      store.dispatch(addComp(this.state.oneBook));
    }
    else {
      store.dispatch(addComp(this.state.oneBook));
      this.props.history.push("/compare");
    }
    console.log(store.getState().compare);
  }


  render() {
    return (
      <div class="oneBook">
      <div class="wrapper">
        <Notifications />
        <button class="backButton" onClick={this.goback}> <span> Back</span> </button>
        <button class="button zoom buy" onClick={this.addToCart}><span>Buy</span></button>
        <button class="button zoom" onClick={this.toCompare}><span>Compare<sup>{store.getState().compare.length}</sup></span></button>
        <br></br>
        <div class="image">
          <img alt='' src={this.state.oneBook.picture} />
        </div>
        <div class="divDescription">
          <p><span>Description:</span> {this.state.oneBook.description}</p>
          <p><span>Bookname:</span> {this.state.oneBook.name}</p>
          <p><span>Author:</span> {this.state.oneBook.author}</p>
          <p><span>Language:</span> {this.state.oneBook.lang}</p>
          <p><span>ISBN:</span> {this.state.oneBook.isbn}</p>
          <p><span>Price:</span> {this.state.oneBook.price}$</p>
          <p><span>Year:</span> {this.state.oneBook.year}</p>
       </div>
       </div>
       </div>
    )
  }
}

export default One;
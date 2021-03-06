import React, { Component } from 'react';
import axios from 'axios';
import store from './store.js'
import "./assets/css/One.css"
import "./assets/css/App.css"
import { addBook, addComp } from './actions/actionTypes'
import Notifications, {notify} from 'react-notify-toast'

class One extends Component {
  constructor(props){
    super(props);
    this.state={
      oneBook: {},
      isAuthenticated: false,
      isLoad: true
    };
    this.goback = this.goback.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.updateAuth = this.updateAuth.bind(this);
    this.toCompare = this.toCompare.bind(this);
  }


  componentDidMount(){
    axios.get(this.props.location.pathname)
    .then( res => {
      console.log('one:');
      console.log(res.data.book);
      this.setState({
        oneBook: res.data.book
      });
      this.setState({
        isLoad: false
      })
    })
    this.unsubscribe = store.subscribe(this.updateAuth);
    window.scrollTo(0,0);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  updateAuth(){
    this.setState({isAuthenticated: store.getState().auth})
  }

  addToCart(){
    if(!this.state.oneBook.store){
      let book ={
        picture: this.state.oneBook.picture,
        id: this.state.oneBook.id,
        name: this.state.oneBook.name,
        author: this.state.oneBook.author,
        price: this.state.oneBook.price
      }

      store.dispatch(addBook(book));
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
    store.dispatch(addComp(this.state.oneBook));
  }


  render() {
   if (!this.state.isLoad) {
    return (
      <div className="oneBook">
      <div className="wrapper">
        <Notifications />
        <button className="backButton" onClick={this.goback}> <span> Back</span> </button>
        <button className="button zoom buy" onClick={this.addToCart}><span>Buy</span></button>
        <button className="button zoom" onClick={this.toCompare}><span>To compare</span></button>
        <br></br>
        <div className="image">
          <img alt='' src={this.state.oneBook.picture} />
        </div>
        <div className="divDescription">
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
    );
  }
  else {
    return (
      <div className="divAll">
        <div className="spinner"></div>
      </div>
    );
  }
  }
}

export default One;

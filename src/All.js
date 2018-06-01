import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import store from './store.js'
import './assets/css/All.css'


class All extends Component {
  constructor(props){
    super(props);
    this.state={
      books: []
    };
    this.showOneBook = this.showOneBook.bind(this);
    this.listener = this.listener.bind(this);
  }

  componentDidMount() {
    this.listener();
    store.subscribe(this.listener);
  };

  componentWillUnmount(){
    (unsubscribe => store.subscribe(this.listener));
  }

  componentDidUpdate(){
  }

  listener(){
    this.setState({books: store.getState().books})
  }



  showOneBook(event){
      console.log(event.target.id);
      this.props.history.push("/one/" + event.target.id);

  }



  render() {
      return (
      <div class="divAll">
        <div class="products clearfix">

            {this.state.books.map(book => <div class="product-wrapper">
              <div class="product">
              <div class="product-main">
                <p>{book.bookName} - {book.author}</p>
              </div>
                <div class="product-photo">
                  <img className="Left" alt="../../alt.png" src={book.picture} />
                </div>
                  <button  id={book.id} onClick={this.showOneBook} className="button zoom"><span>More</span></button>

                </div>
              </div>)}

        </div>
      </div>
      );

  }
}

export default All;

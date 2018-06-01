import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import store from './store.js'
import './assets/css/All.css'

class Compare extends Component {
  constructor(props){
    super(props);
    this.state={
      books: []
    };
    this.comparePrices = this.comparePrices.bind(this);
    this.compareYear = this.compareYear.bind(this);
    this.clearCompare = this.clearCompare.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    this.setState({
      books: store.getState().compare
    })
    console.log(this.state.books);
  };

  componentWillUnmount(){
  }

  componentDidUpdate(){
  }

  comparePrices(book){
      let arr =[];
      for (var i = 0; i < this.state.books.length; i++) {
        arr.push(this.state.books[i].item.price);
      }
      console.log(Math.max(...arr));
      if (book.item.price==Math.max(...arr)) {
        return <span class="red">{book.item.price}</span>;
      }
      if (book.item.price == Math.min(...arr)) {
        return <span class="green">{book.item.price}</span>;
      }
      return <span class="black">{book.item.price}</span>;

  }

  compareYear(book){
      let arr =[];
      for (var i = 0; i < this.state.books.length; i++) {
        arr.push(this.state.books[i].item.year);
      }
      console.log(Math.max(...arr));
      if (book.item.year==Math.min(...arr)) {
        return <span class="red">{book.item.year}</span>;
      }
      if (book.item.year == Math.max(...arr)) {
        return <span class="green">{book.item.year}</span>;
      }
      return <span class="black">{book.item.year}</span>;

  }

  deleteItem(event){
    let i =0;
    console.log(event.target.id);
    for(i=0 ;i<this.state.books.length; i++){
      if(this.state.books[i].numb==event.target.id)
        break;
    }
    console.log('i ' + i);
    let newBooks = this.state.books;
    newBooks.splice(i,1);
    this.setState({
      books: newBooks
    });
    store.dispatch({
      type: 'UPDATE_COMPARE',
      item: newBooks
    })
  }

  clearCompare(){
    store.dispatch({
      type: 'UPDATE_COMPARE',
      item: new Array()
    });
    console.log(store.getState().compare);
    this.setState({
      books: store.getState().compare
    })
    this.props.history.goBack();
  }


  render() {
      return (
        <div class="divAll">

          <button class="backButton" onClick={this.props.history.goBack}> <span> Back</span> </button>
          <button class="button zoom" onClick={this.clearCompare}> <span>Clear</span> </button>
          <br></br>
          <div class="products clearfix">
              {this.state.books.map(book => <div class="product-wrapper">
                <div class="product">
                <div class="product-main">
                  <p>{book.item.bookName} - {book.item.author}</p>
                </div>
                  <div class="product-photo">
                    <img className="Left" alt="../../alt.png" src={book.item.picture} />
                  </div>
                  <p class="CompareText"><span>Price:</span> {this.comparePrices(book)}</p>
                  <p class="CompareText"><span>Year:</span> {this.compareYear(book)}</p>
                  <button  id={book.item.id} onClick={this.showOneBook} className="button zoom"><span>More</span></button>
                  <button className="button zoom delete" id={book.numb} onClick={this.deleteItem}><span>Delete</span></button>

                  </div>
                </div>)}

          </div>
        </div>
      );

  }
}

export default Compare;

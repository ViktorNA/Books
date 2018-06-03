import React, { Component } from 'react';
import store from './store.js'
import './assets/css/All.css'
import {changeLoad} from './actions/actionTypes'

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
        return <span className="red">{book.item.price}</span>;
      }
      if (book.item.price == Math.min(...arr)) {
        return <span className="green">{book.item.price}</span>;
      }
      return <span className="black">{book.item.price}</span>;

  }

  compareYear(book){
      let arr =[];
      for (var i = 0; i < this.state.books.length; i++) {
        arr.push(this.state.books[i].item.year);
      }
      console.log(Math.max(...arr));
      if (book.item.year==Math.min(...arr)) {
        return <span className="red">{book.item.year}</span>;
      }
      if (book.item.year == Math.max(...arr)) {
        return <span className="green">{book.item.year}</span>;
      }
      return <span className="black">{book.item.year}</span>;

  }

  deleteItem(id){
    let i =0;
    console.log(id);
    for(i=0 ;i<this.state.books.length; i++){
      if(this.state.books[i].numb==id)
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

  showOneBook(id){
      store.dispatch(changeLoad(true));
      this.props.history.push("/one/" + id);
  }

  render() {
      return (
        <div className="divAll">
          <div className="divButtons">
            <button className="backButton" onClick={this.props.history.goBack}> <span> Back</span> </button>
            <button className="button zoom" onClick={this.clearCompare}> <span>Clear</span> </button>
          </div>
          <br></br>
          <br></br>
          <div className="">
          <div className="products clearfix">
              {this.state.books.map(book => <div className="product-wrapper">
                <div className="product">
                <div className="product-main">
                  <p>{book.item.bookName} - {book.item.author}</p>
                </div>
                  <div className="product-photo">
                    <img className="Left" alt="../../alt.png" src={book.item.picture} />
                  </div>
                  <p className="CompareText"><span>Price:</span> {this.comparePrices(book)}</p>
                  <p className="CompareText"><span>Year:</span> {this.compareYear(book)}</p>
                  <button  id={book.item.id} key={book.item.id} onClick={()=>this.showOneBook(book.item.id)} className="button zoom"><span>More</span></button>
                  <button className="button zoom delete" id={book.numb} onClick={()=>this.deleteItem(book.numb)}><span>Delete</span></button>

                  </div>
                </div>)}
              </div>
          </div>
        </div>
      );

  }
}

export default Compare;

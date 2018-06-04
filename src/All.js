import React, { Component } from 'react';
import store from './store.js'
import './assets/css/All.css'
import {v4} from 'node-uuid'
import {changeLoad} from './actions/actionTypes'


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
    this.unsubscribe = store.subscribe(this.listener);
  }

  componentDidUpdate(){
  }

  listener(){
    this.setState({books: store.getState().books})
  }



  showOneBook(id){
      console.log(id);
      this.props.history.push("/one/" + id);
  }


  render() {
    if (!store.getState().isLoad) {
      return (
      <div className="divAll">
        <div className="products clearfix">

            {this.state.books.map(book => <div className="product-wrapper">
              <div className="product">
              <div className="product-main">
                <p>{book.bookName} - {book.author}</p>
              </div>
                <div className="product-photo">
                  <img className="Left" alt="No image" src={book.picture} />
                </div>
                  <button  id={book.id} key={v4()} onClick={()=> this.showOneBook(book.id)} className="button"><span>More</span></button>

                </div>
              </div>)}

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

export default All;

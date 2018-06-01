import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import './assets/css/App.css';
import store from './store.js';
import Notifications, {notify} from 'react-notify-toast';



class App extends Component {
  constructor(props){
    super(props);
    this.state={
      authorName: "",
      bookName: "",
      bookYear1: '',
      bookYear2: '',
      bookCoast1:'',
      bookCoast2:'',
      value:'',
      first: '0',
      last: 500,
      params: '',
      bookCount: 0,
      books: [],
      showOne: false,
      oneBook: '',
      pageYOffset: 0,
      url: "/news"
    };
    this.callApi = this.callApi.bind(this);
    this.stateSetter = this.stateSetter.bind(this);
    this.searchChanged = this.searchChanged.bind(this);
    this.searchSubmitted = this.searchSubmitted.bind(this);
    this.searchClear = this.searchClear.bind(this);
    this.searchNext = this.searchNext.bind(this);
    this.searchPrev = this.searchPrev.bind(this);
    this.showOneBook = this.showOneBook.bind(this);
  }

  componentDidMount() {
    console.log('sss');
    this.setState({books: store.getState().books});
  };

  componentDidUpdate(){}

  callApi(params, first, last) {
    params.set('first', first);
    params.set('last', last);
    return axios.post(this.state.url, params);

  };

  stateSetter(res){
    var books = [];
    this.setState({bookCount: res.data.searchResult[0].count});
    console.log(res.data.searchResult);
    for(let i = 0; i<res.data.searchResult.length; i++){
      let obj = {
        picture: '',
        description: '',
        author: '',
        year: '',
        price: '',
        bookName: '',
        id: '',
        store:''
      };
      if(Array.isArray(res.data.searchResult[i].picture)){
        obj.picture = res.data.searchResult[i].picture[0]._text;
      }
      else{
          obj.picture = res.data.searchResult[i].picture._text;
        }
      obj.description = res.data.searchResult[i].description._text;
      obj.author = res.data.searchResult[i].author._text;
      obj.year = res.data.searchResult[i].year._text;
      obj.price = res.data.searchResult[i].price._text;
      obj.bookName = res.data.searchResult[i].name._text;
      obj.id = res.data.searchResult[i]._id;
      obj.store = res.data.searchResult[i].store._text;
      books.push(obj);
    }
    this.setState({books: books});
    console.log(this.state.books.length);
    store.dispatch({type: 'ADD_BOOKS', books: books})
  }

  searchChanged(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  searchSubmitted(event){
    if ((!this.state.bookName)&&(!this.state.authorName)) {
      notify.show("Enter Bookname or Author!", "warning", 3000);
      return 0;
    }
    const params = new URLSearchParams();
    params.set('bookName', this.state.bookName);
    params.set('search', this.state.authorName);
    params.set('year1', this.state.bookYear1);
    params.set('year2', this.state.bookYear2);
    params.set('coast1', this.state.bookCoast1);
    params.set('coast2', this.state.bookCoast2);
    this.setState({params: params});
    this.setState({first: 0});
    this.props.history.push('/')
    this.callApi(params, 0, this.state.last)
        .then(
          (response1) => {
            if (response1 == "empty") {
              notify.show("Nothing found!", "warning", 3000);
              return 0;
            }
            this.stateSetter(response1);
          }
        );
  }

  searchClear(){
    this.setState({
      authorName: "",
      bookName: "",
      bookYear1: '',
      bookYear2: '',
      bookCoast1:'',
      bookCoast2:''
    });
  }

  searchNext(){
    let nextFirst = this.state.first;
    nextFirst += 5;
    console.log(nextFirst + 'vs' + this.state.bookCount);
    if(+ nextFirst < +this.state.bookCount){

      console.log('next' + nextFirst);
      this.setState({first: nextFirst});
      console.log('first' + this.state.first);

      this.callApi(this.state.params, nextFirst, 5);}
      else {
        alert('end');
      }
  }

  searchPrev(){
    let nextFirst = this.state.first;

    console.log(nextFirst + 'vs' + this.state.bookCount);
    if(+ nextFirst > 0){
      nextFirst -= 5;
      console.log('next' + nextFirst);
      this.setState({first: nextFirst});
      console.log('first' + this.state.first);

      this.callApi(this.state.params, nextFirst, 5);}
      else {
        alert('end');
      }
  }

  showOneBook(event){
    console.log(event.target.id);
    const params = new URLSearchParams();
    params.set('id', event.target.id);
    this.setState({showOne: true})
    axios.post('/one', params)
    .then(res => {
      console.log(res);
      let obj ={
        picture: '',
        description: '',
        author: '',
        year: '',
        price: '',
        bookName: '',
        id: '',
        isbn: '',
        lang: '',
      };

      obj.author = res.data.searchResult.author._text;
      obj.description = res.data.searchResult.description._text;
      if(Array.isArray(res.data.searchResult.picture)){
        obj.picture = res.data.searchResult.picture[0]._text;
      }
      else{
          obj.picture = res.data.searchResult.picture._text;
        }
      obj.isbn = res.data.searchResult.ISBN._text;
      obj.lang = res.data.searchResult.language._text;
      obj.price = res.data.searchResult.price._text;
      obj.year = res.data.searchResult.year._text;
      obj.name = res.data.searchResult.name._text;
      obj.id = res.data.searchResult._id;
      store.dispatch({
        type: 'ADD_BOOK',
        book: obj
      })
      this.props.history.push("/one");
    })

  }




  render() {
      return (
        <div class="App">
        <Notifications />
          <form onSubmit={this.searchSubmitted}>
            <label>
              bookName:
            <br></br>
              <input type="text" className="zoom" name="bookName" value={this.state.bookName} onChange={this.searchChanged} />
            </label>
          <br></br>

            <label>
              author:
            <br></br>
              <input type="text" className="zoom" name="authorName" value={this.state.authorName} onChange={this.searchChanged} />
            </label>
          <br></br>

            <label>
              Year from:
            <br></br>
              <input type="text" className="zoom" name="bookYear1" value={this.state.bookYear1} onChange={this.searchChanged} />
            </label>
          <br></br>

            <label>
              Year by:
            <br></br>
              <input type="text" className="zoom" name="bookYear2" value={this.state.bookYear2} onChange={this.searchChanged} />
            </label>
          <br></br>

            <label>
              Coast from:
            <br></br>
              <input type="text" className="zoom" name="bookCoast1" value={this.state.bookCoast1} onChange={this.searchChanged} />
            </label>
          <br></br>

            <label>
              coast by:
            <br></br>
              <input type="text" className="zoom" name="bookCoast2" value={this.state.bookCoast2} onChange={this.searchChanged} />
            </label>
          </form>
        <br></br>
          <button className="button zoom Search" onClick={this.searchSubmitted}><span>Search</span></button>
        <br></br>
          <button className="button zoom Clear" onClick={this.searchClear}><span>Cleazr</span></button>
        <br></br>

        </div>
      );

  }
}

export default App;

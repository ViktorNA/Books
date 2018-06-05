import React, { Component } from 'react';
import store from './store.js'
import './assets/css/All.css'
import Notifications, {notify} from 'react-notify-toast'

class Cart extends Component {
  constructor(props){
    super(props);
    this.state={
      cart: [{
        item:{
          name: '',
          author:'',
          price: 0
        },
        numb: 0
      }]
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.showCart = this.showCart.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.buyCart = this.buyCart.bind(this);
  }


  componentDidMount(){
    this.unsubscribe = store.subscribe(() => {
    this.setState({
      cart: store.getState().cart
    });
});
this.setState({
  cart: store.getState().cart
})

  }

  componentWillUnmount(){
    this.unsubscribe();
  }


  deleteItem(id){
    let i =0;
    console.log(this.state.cart[i].numb);
    console.log(id);
    for(i=0 ;i<this.state.cart.length; i++){
      if(this.state.cart[i].numb==id)
        break;
    }
    console.log('i ' + i);
    this.setState({
      cart: this.state.cart.splice(i, 1)
    });
    store.dispatch({
      type: 'UPDATE_CART',
      item: this.state.cart
    })
  }

  showCart(){
    if(this.state.cart.length)
      return (
        this.state.cart.map(book => <div className="product-wrapper">
            <div className="product">
                <button className="buttonDelete" key={book.numb} onClick={()=>this.deleteItem(book.numb)}><span>X</span></button>
                  <div  onClick={()=> this.props.history.push("/one/" + book.item.id)}>
                    <div className="product-main">
                      <p>{book.item.name} - {book.item.author}</p>
                    </div>
                    <div className="product-photo">
                      <img className="Left"  alt="No image" src={book.item.picture} />
                    </div>
                    <div className="product-main">
                      <p> {book.item.name} </p>
                      <p> {book.item.author} </p>
                      <p> {book.item.price} </p>
                    </div>
                  </div>
              </div>


        </div>
      )
    )
    return (
      <p>Cart is empty</p>
    );
  }

  clearCart(){
    console.log(this.state.cart);
    store.dispatch({
      type: 'UPDATE_CART',
      item: new Array()
    });
  }

  buyCart(){
  console.log(store.getState().auth);
    if(this.state.cart.length<1){
      console.log("Cart is empty");
      notify.show("Cart is empty!", "warning", 3000);
    }
    else if (!store.getState().auth) {
      console.log("Dont logged");
      notify.show("You must be logged in!", "warning", 3000);
    }
    else {
      notify.show("You will be notiffed to email!", "success", 3000);
    }
  }

  render() {
    return (
      <div className="divAll">
        <Notifications />
        <button className="backButton" onClick={this.props.history.goBack} ><span>Back</span></button>
        <div className="products clearfix">
          {this.showCart()}
        </div>
        <button className="button zoom" onClick={this.clearCart} ><span>Clear</span></button>
        <button className="button zoom" onClick={this.buyCart} ><span>Buy</span></button>
      </div>

    )
  }
}

export default Cart;

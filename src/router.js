import React from 'react';
import { Route} from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom'
import './assets/css/index.css'
import App from './App';
import Auth from './Auth';
import One from './One';
import All from './All';
import Cart from './Cart'
import Compare from './Compare'

export default (
  <BrowserRouter>
  <div className="body">
  <Route path='/' component={Auth}/>
  <Route path='/' component={App} />
  <Switch>
    <Route path='/one' component={One} />
    <Route path='/cart' component={Cart} />
    <Route path='/compare' component={Compare}/>
    <Route path='/' component={All} />
  </Switch>

  </div>
</BrowserRouter>
);

import React from 'react';
import { Route} from 'react-router';
import { HashRouter, Switch } from 'react-router-dom'
import './assets/css/index.css'
import App from './App';
import One from './One';
import All from './All';
import Cart from './Cart'
import Compare from './Compare';
import Reg from './Reg';
import AuthNew from './AuthNew';

export default (
  <HashRouter>
  <div className="body">
  <Route path='/' component={AuthNew}/>
  <Route path='/' component={App} />
  <Switch>
    <Route path='/one' component={One} />
    <Route path='/cart' component={Cart} />
    <Route path='/compare' component={Compare}/>
    <Route path='/reg' component={Reg}/>
    <Route path='/all' component={All} />
    <Route path='/' component={Reg} />
  </Switch>

  </div>
</HashRouter>
);

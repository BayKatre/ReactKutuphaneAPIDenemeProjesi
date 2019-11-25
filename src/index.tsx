import React from 'react';
import ReactDOM from 'react-dom';
import AnaSayfa from './AnaSayfa';
import Detay from './Detay';
import Olustur from './Olustur';

import { Router, Route } from 'react-router';
import history from './history';
import 'https://cdn.jsdelivr.net/npm/startbootstrap-sb-admin-2@4.0.7/css/sb-admin-2.css';

ReactDOM.render(
  <Router history={history}>
    <Route exact path="/" component={AnaSayfa}/>
    <Route path="/detail/:id" component={Detay}/>
    <Route path="/create" component={Olustur}/>
  </Router>,
  document.getElementById('root')
);

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import store from './configureStore';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

import Home from './views/Home';
import Products from './views/Products';
import Categories from './views/Categories';
import Product from './views/Product';

import './index.css';

render(
  <Provider store={store}>
    <HashRouter>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/categories" component={Categories} />
          <Route path="/category/:categId" component={Products} />
          <Route path="/product/:productId" component={Product} />
        </Switch>
      </App>
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

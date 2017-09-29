import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import store, { history } from './configureStore';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

import Home from './views/Home';
import Category from './views/Category';
import Categories from './views/Categories';

import './index.css';

render(
  <Provider store={store}>
    <HashRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/categories" component={Categories} />
          <Route exact path="/category/:categId" component={Category} />
        </Switch>
      </App>
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import Categories from '../../components/Categories';

class Home extends Component {
  render() {
    return (
      <div>
        <Header textAlign="center">CATEGORIES</Header>

        <Categories />
      </div>
    );
  }
}

export default Home;

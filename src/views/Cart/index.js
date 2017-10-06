import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Header, Grid, Card } from 'semantic-ui-react';
import { getCart } from './reducer';

class Cart extends Component {
  createRows() {
    return this.props.cart.map(product => (
      <Grid.Row>
        <Grid.Column>{product.name}</Grid.Column>
        <Grid.Column>
          {product.quantity} x {product.price} $
        </Grid.Column>
        <Grid.Column>{product.price} $</Grid.Column>
      </Grid.Row>
    ));
  }

  render() {
    return _.isEmpty(['dasdasdas']) ? (
      <p>Your Cart is Empty</p>
    ) : (
      <div>
        <Header textAlign="center">Cart</Header>
        <Card>
          <Grid>{this.createRows()}</Grid>
        </Card>
      </div>
    );
  }
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  cart: getCart(state.cart),
});

export default connect(mapStateToProps)(Cart);

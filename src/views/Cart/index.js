import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Segment, Header } from 'semantic-ui-react';
import { getCart, cartProductPropType } from './reducer';
import CardProduct from './CartProduct';
import CardSummary from './CartSummary';

class Cart extends Component {
  getTotalPrice() {
    return this.props.cart.reduce((total, item) => (total + Number(item.price)) * item.quantity, 0);
  }

  render() {
    return _.isEmpty(this.props.cart) ? (
      <Segment textAlign="center">Your Cart is Empty</Segment>
    ) : (
      <div>
        <Header textAlign="center">Shopping Cart</Header>
        {this.props.cart.map(product => <CardProduct key={product.id} product={product} />)}
        <CardSummary total={this.getTotalPrice()} cart={this.props.cart} />
      </div>
    );
  }
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(cartProductPropType).isRequired,
};

const mapStateToProps = state => ({
  cart: getCart(state.cart),
});

export default connect(mapStateToProps)(Cart);

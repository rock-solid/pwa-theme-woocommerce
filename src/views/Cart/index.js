import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Segment, Header, Grid, Card } from 'semantic-ui-react';
import { getCart, cartProductPropType } from './reducer';
import CardProduct from './CartProduct';
import CardSummary from './CartSummary';

class Cart extends Component {
  getTotalPrice() {
    return this.props.cart.reduce((total, item) => (total + Number(item.price)) * item.quantity, 0);
  }

  render() {
    return _.isEmpty(this.props.cart) ? (
      <Segment raised textAlign="center">
        Your Cart is Empty
      </Segment>
    ) : (
      <div>
        <Header textAlign="center">Shopping Cart</Header>
        <Card centered raised>
          <Card.Content>
            <Card.Header as={Header} textAlign="left">
              Products
            </Card.Header>
            <Grid centered doubling>
              {this.props.cart.map(product => <CardProduct key={product.id} product={product} />)}
            </Grid>
          </Card.Content>
        </Card>
        <CardSummary total={this.getTotalPrice()} />
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

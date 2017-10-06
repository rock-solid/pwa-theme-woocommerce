import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Segment, Header, Grid, Card, Image } from 'semantic-ui-react';
import { getCart } from './reducer';

class Cart extends Component {
  createProductRows() {
    return this.props.cart.map(product => (
      <Grid.Row centered>
        <Grid.Column width={4} textAlign="center">
          <Image shape="circular" src={product.image} />
        </Grid.Column>
        <Grid.Column width={4}>{product.name}</Grid.Column>
        <Grid.Column width={4}>
          {product.quantity} x $ {product.price}
        </Grid.Column>
        <Grid.Column width={4}>$ {product.price * product.quantity} </Grid.Column>
      </Grid.Row>
    ));
  }

  createOrderSummary() {
    const itemsPrice = this.props.cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

    return (
      <Grid doubling>
        <Grid.Row>
          <Grid.Column>Items price</Grid.Column>
          <Grid.Column textAlign="right" width={13}>
            $ {itemsPrice}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>Transportation price</Grid.Column>
          <Grid.Column textAlign="right" width={13}>
            $ 10
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>Total</Grid.Column>
          <Grid.Column textAlign="right" width={13}>
            $ {itemsPrice + 10}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  render() {
    return _.isEmpty(this.props.cart) ? (
      <Segment raised textAlign="center">
        Your Cart is Empty
      </Segment>
    ) : (
      <div>
        <Header textAlign="center">Cart</Header>
        <Card centered raised>
          <Card.Content>
            <Card.Header as={Header} textAlign="left">
              Products
            </Card.Header>
            <Grid centered doubling>
              {this.createProductRows()}
            </Grid>
          </Card.Content>
        </Card>
        <Card centered raised>
          <Card.Content>
            <Card.Header as={Header} textAlign="left">
              Order Summary
            </Card.Header>
            {this.createOrderSummary()}
          </Card.Content>
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
      price: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  cart: getCart(state.cart),
});

export default connect(mapStateToProps)(Cart);

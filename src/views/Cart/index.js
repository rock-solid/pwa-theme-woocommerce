import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Segment, Header, Grid, Card, Image, Button } from 'semantic-ui-react';
import { getCart } from './reducer';
import { removeProduct, setQuantity } from './actions';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.removeItem = this.removeItem.bind(this);
    this.reduceItemQuantity = this.reduceItemQuantity.bind(this);
    this.increaseItemQuantity = this.increaseItemQuantity.bind(this);
  }

  reduceItemQuantity(id, quantity) {
    const { dispatch } = this.props;

    if (_.find(this.props.cart, { id, quantity: 1 })) {
      dispatch(removeProduct(id));
    }

    dispatch(setQuantity(id, quantity));
  }

  increaseItemQuantity(id, quantity) {
    const { dispatch } = this.props;

    dispatch(setQuantity(id, quantity));
  }

  removeItem(id) {
    const { dispatch } = this.props;

    dispatch(removeProduct(id));
  }

  createProductRows() {
    return this.props.cart.map(product => (
      <Grid.Row centered key={product.id}>
        <Grid.Column width={4} textAlign="center">
          <Button basic compact size="mini" onClick={this.removeItem.bind(this, product.id)}>
            X
          </Button>
          <Image shape="circular" src={product.image} />
        </Grid.Column>
        <Grid.Column width={5}>{product.name}</Grid.Column>
        <Grid.Column width={4}>
          <Button basic compact size="mini" onClick={this.reduceItemQuantity.bind(this, product.id, product.quantity - 1)}>
            -
          </Button>
          {product.quantity} x ${product.price}
          <Button basic compact size="mini" onClick={this.increaseItemQuantity.bind(this, product.id, product.quantity + 1)}>
            +
          </Button>
        </Grid.Column>
        <Grid.Column width={3}>${product.price * product.quantity} </Grid.Column>
      </Grid.Row>
    ));
  }

  createOrderSummary() {
    const itemsPrice = this.props.cart.reduce((total, item) => (total + Number(item.price)) * item.quantity, 0);

    return (
      <Grid doubling>
        <Grid.Row>
          <Grid.Column width={12}>Items price</Grid.Column>
          <Grid.Column textAlign="right" width={4}>
            ${itemsPrice}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={12}>Transportation price</Grid.Column>
          <Grid.Column textAlign="right" width={4}>
            $10
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={12}>Total</Grid.Column>
          <Grid.Column textAlign="right" width={4}>
            ${itemsPrice + 10}
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
        <Header textAlign="center">Shopping Cart</Header>
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
  dispatch: PropTypes.func.isRequired,
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

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ removeProduct, setQuantity }, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

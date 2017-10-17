import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Grid, Image, Button } from 'semantic-ui-react';
import { cartProductPropType } from './reducer';
import { setQuantity, removeProduct } from './actions';

class CartProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: this.props.product.quantity,
    };

    this.increaseItemQuantity = this.increaseItemQuantity.bind(this);
    this.reduceItemQuantity = this.reduceItemQuantity.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  /**
   * Increase product quantity
   */
  increaseItemQuantity() {
    const quantity = this.state.quantity + 1;
    this.setState({ quantity });

    const { dispatch } = this.props;
    dispatch(setQuantity(this.props.product.id, quantity));
  }

  /**
   * Decrease product quantity
   */
  reduceItemQuantity() {
    const { dispatch } = this.props;

    const quantity = this.state.quantity - 1;

    if (quantity === 0) {
      dispatch(removeProduct(this.props.product.id));
      return;
    }

    this.setState({ quantity });
    dispatch(setQuantity(this.props.product.id, quantity));
  }

  /**
   * Delete product from the cart
   */
  removeItem() {
    const { dispatch } = this.props;
    dispatch(removeProduct(this.props.product.id));
  }

  render() {
    return (
      <Grid.Row centered key={this.props.product.id}>
        <Grid.Column width={4} textAlign="center">
          <Button basic compact size="mini" onClick={this.removeItem}>
            X
          </Button>
          <Image shape="circular" src={this.props.product.image} />
        </Grid.Column>
        <Grid.Column width={5}>{this.props.product.name}</Grid.Column>
        <Grid.Column width={4}>
          <Button basic compact size="mini" onClick={this.reduceItemQuantity}>
            -
          </Button>
          {this.state.quantity} x ${this.props.product.price}
          <Button basic compact size="mini" onClick={this.increaseItemQuantity}>
            +
          </Button>
        </Grid.Column>
        <Grid.Column width={3}>${this.props.product.price * this.state.quantity} </Grid.Column>
      </Grid.Row>
    );
  }
}

CartProduct.propTypes = {
  product: cartProductPropType.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ setQuantity, removeProduct }, dispatch));
}

export default connect(null, mapDispatchToProps)(CartProduct);

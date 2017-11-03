import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Card, Grid, Image, Button, Icon, Input } from 'semantic-ui-react';
import { cartProductPropType } from './reducer';
import { setQuantity, removeProduct } from './actions';

import './styles.css';

class CartProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: this.props.product.quantity,
      isExpanded: false,
    };

    this.toggleCardHeight = this.toggleCardHeight.bind(this);
    this.increaseItemQuantity = this.increaseItemQuantity.bind(this);
    this.reduceItemQuantity = this.reduceItemQuantity.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  getProductDescription() {
    if (_.isNil(this.props.product.variationId)) {
      return this.props.product.name;
    }

    return _.reduce(
      this.props.product.selections,
      (selectionsString, selection, option) => _.startCase(selectionsString + ' ' + option + ' ' + selection),
      this.props.product.name,
    );
  }

  /**
   * Increase product quantity
   */
  increaseItemQuantity() {
    const quantity = this.state.quantity + 1;
    this.setState({ quantity });

    const { dispatch } = this.props;
    dispatch(setQuantity(this.props.product.id, this.props.product.variationId, quantity));
  }

  toggleCardHeight() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  /**
   * Decrease product quantity
   */
  reduceItemQuantity() {
    const { dispatch } = this.props;

    const quantity = this.state.quantity - 1;

    if (quantity === 0) {
      dispatch(removeProduct(this.props.product.id, this.props.product.variationId));
      return;
    }

    this.setState({ quantity });
    dispatch(setQuantity(this.props.product.id, this.props.product.variationId, quantity));
  }

  /**
   * Delete product from the cart
   */
  removeItem() {
    const { dispatch } = this.props;
    dispatch(removeProduct(this.props.product.id, this.props.product.variationId));
  }

  render() {
    return (
      <Card centered className="cart-product">
        <Card.Content>
          <Grid doubling>
            <Grid.Row centered key={this.props.product.id}>
              <Grid.Column width={4} textAlign="center">
                <Image shape="circular" src={this.props.product.image} />
              </Grid.Column>
              <Grid.Column width={5} className="break-words">
                {this.getProductDescription()}
              </Grid.Column>
              <Grid.Column width={4}>
                {this.state.quantity} x ${this.props.product.price}
              </Grid.Column>
              <Grid.Column width={3} textAlign="right">
                ${this.props.product.price * this.state.quantity}{' '}
              </Grid.Column>
              <div className="cart-buttons">
                <Button icon onClick={this.toggleCardHeight} color="purple">
                  <Icon name="pencil" />
                </Button>
                <Button icon className="cart-delete" onClick={this.removeItem}>
                  <Icon name="trash" />
                </Button>
              </div>
            </Grid.Row>
            {this.state.isExpanded ? (
              <Grid.Row>
                <Grid.Column width={4}>
                  <p className="cart-quantity-label">&nbsp;Quantity:</p>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Button icon onClick={this.reduceItemQuantity} className="cart-button">
                    <Icon name="minus" />
                  </Button>
                  <Input value={this.state.quantity} readOnly className="cart-quantity-input" />
                  <Button icon onClick={this.increaseItemQuantity} className="cart-button">
                    <Icon name="plus" />
                  </Button>
                </Grid.Column>
              </Grid.Row>
            ) : null}
          </Grid>
        </Card.Content>
      </Card>
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

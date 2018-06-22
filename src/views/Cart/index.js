import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Segment, Header } from 'semantic-ui-react';
import { getCart, cartProductPropType } from './reducer';
import CardProduct from './CartProduct';
import CardSummary from './CartSummary';
import { closeSearch } from '../../components/NavBar/actions';
import { isSearchVisible } from '../../components/NavBar/reducer';

class Cart extends Component {
  componentDidMount() {
    if (this.props.searchVisible) {
      this.props.closeSearch();
    }
  }

  getTotalPrice() {
    const total = _.sumBy(this.props.cart, item => (Number(item.quantity) * Number(item.price)));
    return Math.round(total * 100) / 100;
  }

  render() {
    return _.isEmpty(this.props.cart) ? (
      <Segment textAlign="center">Your Cart is Empty</Segment>
    ) : (
        <div>
          <Header textAlign="center">Shopping Cart</Header>
          {this.props.cart.map(product => (
            <CardProduct
              key={_.isNil(product.variationId) ? product.id : product.variationId}
              product={product}
            />
          ))}
          <CardSummary total={this.getTotalPrice()} cart={this.props.cart} />
        </div>
      );
  }
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(cartProductPropType).isRequired,
  searchVisible: PropTypes.bool.isRequired,
  closeSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cart: getCart(state.cart),
  searchVisible: isSearchVisible(state.navbar),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ closeSearch }, dispatch));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);

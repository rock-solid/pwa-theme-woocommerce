import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchProducts } from '../Products/actions';
import { getProducts, getProductsFetching, productPropType } from '../Products/reducer';
import ProductDetails from './ProductDetails';
import { closeSearch } from '../../components/NavBar/actions';
import { getSearchInput } from '../../components/NavBar/reducer';

class Product extends Component {
  componentWillMount() {
    const { searchVisible, match } = this.props;
    this.readProduct(match.params.productId);
    if (searchVisible) {
      this.props.closeSearch();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.productId !== nextProps.match.params.productId) {
      this.readProduct(nextProps.match.params.productId);
    }
  }

  readProduct(productId) {
    const { dispatch } = this.props;
    dispatch(fetchProducts({ id: productId }));
  }

  render() {
    if (this.props.loading === 1) {
      return (
        <div>
          <Loader active />
        </div>
      );
    }

    const product = this.props.products.find(
      obj => obj.id === Number(this.props.match.params.productId),
    );

    if (_.isNil(product)) {
      return <p>Product does not exist</p>;
    }

    return <ProductDetails product={product} />;
  }
}

Product.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  products: PropTypes.arrayOf(productPropType).isRequired,
  searchVisible: PropTypes.bool.isRequired,
  closeSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: getProductsFetching(state.products),
  products: getProducts(state.products),
  searchVisible: getSearchInput(state.navbar),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchProducts, closeSearch }, dispatch));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Product);

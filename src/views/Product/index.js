import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchProducts } from '../Products/actions';
import { getProducts, getProductsFetching } from '../Products/reducer';
import ProductDetails from '../../components/ProductDetails';

class Product extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchProducts(null, this.props.match.params.productId));
  }

  getProduct(productId) {
    return this.props.products.find(product => product.id === Number(productId));
  }

  render() {
    if (this.props.loading === 1) {
      return (
        <div>
          <Loader active />
        </div>
      );
    }

    if (this.props.products.length === 0) {
      return <p>Product does not exist</p>;
    }

    return <ProductDetails product={this.getProduct(this.props.match.params.productId)} />;
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
  products: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

const mapStateToProps = state => ({
  loading: getProductsFetching(state.products),
  products: getProducts(state.products),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchProducts }, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);

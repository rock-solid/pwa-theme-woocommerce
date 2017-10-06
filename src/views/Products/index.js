import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import { fetchProducts } from './actions';
import { getProductsFetching, getProducts, productPropType } from './reducer';
import ProductsList from '../../components/ProductsList';

class Products extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchProducts(this.props.match.params.categId, null));
  }

  getCategoryName(categories) {
    return categories.find(
      category => Number(category.id) === Number(this.props.match.params.categId),
    ).name;
  }

  hasCurrentCategory(product) {
    const categId = this.props.match.params.categId;
    return (
      product.categories.find(category => Number(category.id) === Number(categId)) !== undefined
    );
  }

  render() {
    if (this.props.loading === 1) {
      return (
        <div>
          <Loader active />
        </div>
      );
    }

    const filteredProducts = this.props.products.filter(product =>
      this.hasCurrentCategory(product),
    );

    if (filteredProducts.length === 0) {
      return <p>No products found.</p>;
    }

    return (
      <ProductsList
        products={filteredProducts}
        categoryName={this.getCategoryName(filteredProducts[0].categories)}
      />
    );
  }
}

Products.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(productPropType).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      categId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  loading: getProductsFetching(state.products),
  products: getProducts(state.products),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchProducts }, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);

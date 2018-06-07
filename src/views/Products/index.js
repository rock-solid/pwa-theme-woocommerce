import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Loader } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';

import { fetchProducts } from './actions';
import { getProductsFetching, getProducts, productPropType } from './reducer';
import ProductsList from '../../components/ProductsList';
import { closeSearch } from '../../components/NavBar/actions';
import { getSearchInput } from '../../components/NavBar/reducer';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentWillMount() {
    const { searchVisible, match } = this.props;
    const { page } = this.state;
    this.readProducts(match.params.categId, page);
    if (searchVisible) {
      this.props.closeSearch();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match } = this.props;
    const { page } = this.state;
    if (match.params.categId !== nextProps.match.params.categId) {
      this.readProducts(nextProps.match.params.categId, page);
    }
  }

  getCategoryName(categories) {
    return categories.find(
      category => Number(category.id) === Number(this.props.match.params.categId),
    ).name;
  }

  getProductsByCategory() {
    const categoryId = Number(this.props.match.params.categId);
    if (this.props.products.length === 0) {
      return [];
    }

    return this.props.products.filter(
      product =>
        Array.isArray(product.categories) &&
        !_.isNil(_.find(product.categories, { id: categoryId })),
    );
  }

  readProducts(categId, page) {
    const { dispatch } = this.props;
    dispatch(fetchProducts({ categId, page }));
  }

  render() {
    if (this.props.loading === 1) {
      return (
        <div>
          <Loader active />
        </div>
      );
    }

    const filteredProducts = this.getProductsByCategory();

    if (filteredProducts.length === 0) {
      return <p>No products found.</p>;
    }

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          if (this.props.products.length % 10) {
            this.setState({ state: this.state.page + 1 });
            this.readProducts(this.props.match.params.categId, this.state.page);
          }
        }}
        hasMore={true || false}
        useWindow={false}
      >
        <ProductsList
          products={filteredProducts}
          title={this.getCategoryName(filteredProducts[0].categories)}
        />
      </InfiniteScroll>
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
)(Products);

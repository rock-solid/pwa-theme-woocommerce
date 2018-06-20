import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Loader, Container } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { fetchProducts } from './actions';
import { getProductsFetching, getProducts, productPropType, getProductsHasMore } from './reducer';
import ProductsList from '../../components/ProductsList';
import { closeSearch } from '../../components/NavBar/actions';
import { isSearchVisible } from '../../components/NavBar/reducer';

class Products extends Component {
  constructor(props) {
    super(props);
    this.loadProducts = this.loadProducts.bind(this);
  }

  componentDidMount() {
    if (this.props.searchVisible) {
      this.props.closeSearch();
    }

    this.readProducts(1);
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;

    if (match.params.categId !== prevProps.match.params.categId) {
      this.readProducts(1);
    }
  }

  getCategoryName(categories) {
    return categories.find(category =>
      Number(category.id) === Number(this.props.match.params.categId)).name;
  }

  loadProducts() {
    if (this.props.hasMore) {
      // 20 is the default per_page number used for paginating products
      const nextPage = Math.round(this.props.products.length / 20) + 1;
      this.readProducts(nextPage);
    }
  }

  readProducts(page) {
    const { dispatch } = this.props;
    dispatch(fetchProducts({
      category: this.props.match.params.categId,
      page,
      order: 'asc',
      orderby: 'title',
      per_page: 20,
    }));
  }

  render() {
    const { loading, products, hasMore } = this.props;

    if (loading === 1 && products.length === 0) {
      return (
        <div>
          <Loader active />
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <Container>
          <p>No products found.</p>
        </Container>
      );
    }

    return (
      <InfiniteScroll
        dataLength={products.length}
        next={this.loadProducts}
        hasMore={hasMore}
      >
        <ProductsList
          products={_.orderBy(products, ['name'], ['asc'])}
          title={this.getCategoryName(products[0].categories)}
        />
      </InfiniteScroll>
    );
  }
}

Products.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(productPropType).isRequired,
  hasMore: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      categId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  searchVisible: PropTypes.bool.isRequired,
  closeSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  loading: getProductsFetching(state.products),
  products: getProducts(state.products, props.match.params.categId),
  hasMore: getProductsHasMore(state.products),
  searchVisible: isSearchVisible(state.navbar),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchProducts, closeSearch }, dispatch));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Products);

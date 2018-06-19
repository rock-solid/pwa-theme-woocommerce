import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Container } from 'semantic-ui-react';
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';

import { fetchProducts } from '../Products/actions';
import { getProductsFetching, getProducts, productPropType } from '../Products/reducer';
import ProductsList from '../../components/ProductsList';
import { closeSearch } from '../../components/NavBar/actions';
import { isSearchVisible } from '../../components/NavBar/reducer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      hasMore: false,
    };
    this.loadProducts = this.loadProducts.bind(this);
  }

  componentDidMount() {
    const { dispatch, searchVisible } = this.props;
    dispatch(fetchProducts({ page: this.state.page, featured: 1 }));
    if (searchVisible) {
      this.props.closeSearch();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.products.length < this.props.products.length) {
      this.setState({ page: this.state.page + 1, hasMore: true });
    }
  }

  loadProducts() {
    if (this.state.hasMore) {
      this.props.dispatch(fetchProducts({ page: this.state.page }));
      this.setState({ hasMore: false });
    }
  }

  render() {
    const { loading, products } = this.props;
    const { hasMore } = this.state;

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

    // Filter featured products (if there are any)
    const featuredProducts = this.props.products.filter(
      product => product.featured,
    );

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadProducts}
        hasMore={hasMore}
        useWindow={false}
      >
        <ProductsList products={_.orderBy(featuredProducts.length > 0 ? featuredProducts : this.props.products, ['date_created'], ['desc'])} title="Home" />
      </InfiniteScroll>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(productPropType).isRequired,
  searchVisible: PropTypes.bool.isRequired,
  closeSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: getProductsFetching(state.products),
  products: getProducts(state.products),
  searchVisible: isSearchVisible(state.navbar),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchProducts, closeSearch }, dispatch));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

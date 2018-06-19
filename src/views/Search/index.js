import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Container } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';

import { fetchProducts } from '../Products/actions';
import { productPropType } from '../Products/reducer';
import { getSearchProductsFetching, getSearchProducts } from './reducer';
import ProductsList from '../../components/ProductsList';

import { closeSearch } from '../../components/NavBar/actions';
import { isSearchVisible } from '../../components/NavBar/reducer';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      hasMore: false,
    };
    this.readProducts = this.readProducts.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  componentWillMount() {
    this.readProducts(this.props.match.params.search, this.state.page);
    if (this.props.searchVisible) {
      this.props.closeSearch();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.search !== nextProps.match.params.search) {
      this.readProducts(nextProps.match.params.search, this.state.page);
    }
    if (nextProps.products.length > this.props.products.length) {
      this.setState({ page: this.state.page + 1, hasMore: true });
    }
  }

  loadMore() {
    if (this.state.hasMore) {
      this.readProducts(this.props.match.params.search, this.state.page);
      this.setState({ hasMore: false });
    }
  }

  readProducts(search, page) {
    const { dispatch } = this.props;
    dispatch(fetchProducts({ search, page }));
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
      if (!navigator.onLine) {
        return (
          <Container>
            <p>No internet connection.</p>
          </Container>
        );
      }
      return (
        <Container>
          <p>No products found.</p>
        </Container>
      );
    }
    return (
      <InfiniteScroll pageStart={0} loadMore={this.loadMore} hasMore={hasMore} useWindow={false}>
        <ProductsList products={_.orderBy(products, ['date_created'], ['desc'])} title="Search" />
      </InfiniteScroll>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(productPropType).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  searchVisible: PropTypes.bool.isRequired,
  closeSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: getSearchProductsFetching(state.search),
  products: getSearchProducts(state.search),
  searchVisible: isSearchVisible(state.navbar),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchProducts, closeSearch }, dispatch));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);

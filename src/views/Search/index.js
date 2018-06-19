import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Container, Header } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import _ from 'lodash';

import { productPropType } from '../Products/reducer';
import { fetchProducts, resetSearchProducts } from './actions';
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

  componentDidMount() {
    if (this.props.searchVisible) {
      this.props.closeSearch();
    }

    this.readProducts(1);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.search !== prevProps.match.params.search) {
      this.props.resetSearchProducts();
      this.readProducts(1);
    }

    if (prevProps.products.length < this.props.products.length) {
      this.setState({ hasMore: true });
    }
  }

  loadMore() {
    if (this.state.hasMore) {
      this.readProducts(this.state.page + 1);
    }
  }

  readProducts(page) {
    const { dispatch } = this.props;
    dispatch(fetchProducts({
      search: this.props.match.params.search,
      page,
      order: 'asc',
      orderby: 'title',
    }));
    this.setState({ page, hasMore: false });
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
          <Header textAlign="center">Search `{this.props.match.params.search}`</Header>
          <p>No products found.</p>
        </Container>
      );
    }

    const items = _.orderBy(products, ['name'], ['asc']);

    return (
      <InfiniteScroll
        dataLength={items.length}
        next={this.loadMore}
        hasMore={hasMore}
      >
        <ProductsList products={items} title={`Search '${this.props.match.params.search}'`} />
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
  resetSearchProducts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: getSearchProductsFetching(state.search),
  products: getSearchProducts(state.search),
  searchVisible: isSearchVisible(state.navbar),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchProducts, closeSearch, resetSearchProducts }, dispatch));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);

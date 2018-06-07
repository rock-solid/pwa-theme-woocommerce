import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Container } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';

import { fetchProducts } from '../Products/actions';
import { getProductsFetching, getProducts, productPropType } from '../Products/reducer';
import ProductsList from '../../components/ProductsList';
import { closeSearch } from '../../components/NavBar/actions';
import { getSearchInput } from '../../components/NavBar/reducer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentWillMount() {
    const { dispatch, searchVisible } = this.props;
    dispatch(fetchProducts());
    if (searchVisible) {
      this.props.closeSearch();
    }
  }

  render() {
    const { loading, products } = this.props;
    const { page } = this.state;

    if (loading === 1) {
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
        pageStart={0}
        loadMore={() => {
          if (products.length % 10) {
            this.setState({ state: page + 1 });
            this.readProducts(page);
          }
        }}
        hasMore={true || false}
        useWindow={false}
      >
        <ProductsList products={products} title="Home" />{' '}
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
  searchVisible: getSearchInput(state.navbar),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchProducts, closeSearch }, dispatch));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

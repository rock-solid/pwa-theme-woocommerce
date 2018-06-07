import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';

import { fetchProducts } from '../Products/actions';
import { getProductsFetching, getProducts, productPropType } from '../Products/reducer';
import ProductsList from '../../components/ProductsList';
import { closeSearch } from '../../components/NavBar/actions';
import { getSearchInput } from '../../components/NavBar/reducer';

class Home extends Component {
  componentWillMount() {
    const { dispatch, searchVisible } = this.props;
    dispatch(fetchProducts());
    if (searchVisible) {
      this.props.closeSearch();
    }
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
      return <p>No products found.</p>;
    }

    return <ProductsList products={this.props.products} title="Home" />;
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

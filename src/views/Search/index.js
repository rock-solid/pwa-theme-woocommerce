import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';

import { fetchProducts } from '../Products/actions';
import { productPropType } from '../Products/reducer';
import { getSearchProductsFetching, getSearchProducts } from './reducer';
import ProductsList from '../../components/ProductsList';

class Products extends Component {
  componentWillMount() {
    this.readProducts(this.props.match.params.search);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.search !== nextProps.match.params.search) {
      this.readProducts(nextProps.match.params.search);
    }
  }

  readProducts(search) {
    const { dispatch } = this.props;
    dispatch(fetchProducts({ search }));
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
    return <ProductsList products={this.props.products} title="Search" />;
  }
}

Products.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(productPropType).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  loading: getSearchProductsFetching(state.search),
  products: getSearchProducts(state.search),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchProducts }, dispatch));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Products);

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import { fetchProducts } from '../Products/actions';
import { getProductsFetching, getProducts, productPropType } from '../Products/reducer';
import ProductsList from '../../components/ProductsList';

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchProducts({ featured: 1 }));
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

    // Filter featured products (if there are any)
    const featuredProducts = this.props.products.filter(
      product => product.featured,
    );

    return (<ProductsList
      products={featuredProducts.length > 0 ? featuredProducts : this.props.products}
      title="Home"
    />);
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(productPropType).isRequired,
};

const mapStateToProps = state => ({
  loading: getProductsFetching(state.products),
  products: getProducts(state.products),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchProducts }, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

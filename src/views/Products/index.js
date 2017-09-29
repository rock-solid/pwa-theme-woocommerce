import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Header } from 'semantic-ui-react';
import { fetchProducts } from './actions';
import { getProductsFetching, getProducts } from './reducer';
import CategoryProductsList from '../../components/CategoryProductsList';

class CategoryProducts extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchProducts(this.props.match.params.categId));
  }

  hasCurrentCategory(product) {
    const categId = this.props.match.params.categId;
    return product.categories.find(category => Number(category.id) === Number(categId)) !== undefined;
  }

  render() {
    if (this.props.loading === 1) {
      return (
        <div>
          <Header textAlign="center">Category Name</Header>
          <Loader active />
        </div>
      );
    }

    const filteredProducts = this.props.categoryProducts.filter(product => this.hasCurrentCategory(product));

    return <CategoryProductsList categoryProducts={filteredProducts} />;
  }
}

CategoryProducts.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  categoryProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.shape({
        src: PropTypes.string,
      }),
      price: PropTypes.string.isRequired,
      images: PropTypes.array.isRequired,
      categories: PropTypes.array.isRequired,
    }),
  ).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      categId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  loading: getProductsFetching(state.products),
  categoryProducts: getProducts(state.products),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchProducts }, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProducts);

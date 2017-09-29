import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCategoryProducts } from './actions';
import { getCategoryProducts, getCategoryProductsFetching } from './reducer';
import CategoryProductsList from '../../components/CategoryProductsList';

class Category extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategoryProducts(this.props.match.params.categId));
  }

  hasCurrentCategory(product) {
    const categId = this.props.match.params.categId;
    return product.categories.find(category => Number(category.id) === Number(categId)) !== undefined;
  }

  render() {
    const filteredProducts = this.props.categoryProducts.filter(product => this.hasCurrentCategory(product));

    return <CategoryProductsList loading={this.props.loading} categoryProducts={filteredProducts} />;
  }
}

Category.propTypes = {
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
  loading: getCategoryProductsFetching(state.categoryProducts),
  categoryProducts: getCategoryProducts(state.categoryProducts),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchCategoryProducts }, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);

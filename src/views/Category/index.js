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

  render() {
    return (
      <CategoryProductsList
        categName={this.props.match.params.categName}
        loading={this.props.loading}
        categoryProducts={this.props.categoryProducts}
      />
    );
  }
}

const mapStateToProps = state => ({
  loading: getCategoryProductsFetching(state.categoryProducts),
  categoryProducts: getCategoryProducts(state.categoryProducts),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchCategoryProducts }, dispatch));
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
      categName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);

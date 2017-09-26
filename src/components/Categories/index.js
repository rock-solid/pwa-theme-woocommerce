import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCategories } from './actions';
import { getCategories, getCategoriesFetching } from './reducer';
import CategoriesList from '../CategoriesList';

class Categories extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategories);
  }

  render() {
    return <CategoriesList loading={this.props.loading} categories={this.props.categories} />;
  }
}

const mapStateToProps = state => ({
  loading: getCategoriesFetching(state.categories),
  categories: getCategories(state.categories),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchCategories }, dispatch));
}

Categories.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.shape({
        src: PropTypes.string,
      }),
    }),
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);

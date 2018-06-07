import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Loader } from 'semantic-ui-react';

import { fetchCategories } from './actions';
import { getCategories, getCategoriesFetching, categoryPropType } from './reducer';
import CategoriesList from './CategoriesList';
import { closeSearch } from '../../components/NavBar/actions';
import { getSearchInput } from '../../components/NavBar/reducer';

class Categories extends Component {
  componentWillMount() {
    const { dispatch, searchVisible } = this.props;
    dispatch(fetchCategories);
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

    return (
      <div>
        <Header textAlign="center">Categories</Header>
        <CategoriesList categories={this.props.categories} />
      </div>
    );
  }
}

Categories.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(categoryPropType).isRequired,
  searchVisible: PropTypes.bool.isRequired,
  closeSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: getCategoriesFetching(state.categories),
  categories: getCategories(state.categories),
  searchVisible: getSearchInput(state.navbar),
});

function mapDispatchToProps(dispatch) {
  return Object.assign(
    { dispatch },
    bindActionCreators({ fetchCategories, closeSearch }, dispatch),
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Categories);

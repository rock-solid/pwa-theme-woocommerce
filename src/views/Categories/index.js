import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Loader, Container } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';

import { fetchCategories } from './actions';
import { getCategories, getCategoriesFetching, categoryPropType } from './reducer';
import CategoriesList from './CategoriesList';
import { closeSearch } from '../../components/NavBar/actions';
import { getSearchInput } from '../../components/NavBar/reducer';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      hasMore: false,
    };
    this.loadCategories = this.loadCategories.bind(this);
  }

  componentWillMount() {
    const { dispatch, searchVisible } = this.props;
    dispatch(fetchCategories({ page: this.state.page }));
    if (searchVisible) {
      this.props.closeSearch();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories.length > this.props.categories.length) {
      this.setState({ page: this.state.page + 1, hasMore: true });
    }
  }

  loadCategories() {
    if (this.state.hasMore) {
      this.props.dispatch(fetchCategories({ page: this.state.page }));
      this.setState({ hasMore: false });
    }
  }

  render() {
    const { loading, categories } = this.props;
    const { hasMore } = this.state;

    if (loading === 1 && categories.length === 0) {
      return (
        <div>
          <Loader active />
        </div>
      );
    }

    if (categories.length === 0) {
      return (
        <Container>
          <p>No categories found.</p>
        </Container>
      );
    }

    return (
      <div>
        <Header textAlign="center">Categories</Header>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadCategories}
          hasMore={hasMore}
          useWindow={false}
        >
          <CategoriesList categories={categories} />
        </InfiniteScroll>
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

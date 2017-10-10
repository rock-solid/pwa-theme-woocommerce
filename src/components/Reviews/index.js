import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Card, Header } from 'semantic-ui-react';
import { fetchReviews } from './actions';
import { getReviewsFetching, getReviews, reviewPropType } from './reducer';
import Review from './Review';

class Reviews extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchReviews(this.props.productId));
  }

  render() {
    return this.props.loading === 1 || _.isEmpty(this.props.reviews) ? null : (
      <Card centered raised>
        <Card.Content>
          <Card.Header as={Header} size="tiny">
            Reviews
          </Card.Header>
          {this.props.reviews.map(review => <Review rating={review.rating} reviewer={review.name} content={review.review} />)}
        </Card.Content>
      </Card>
    );
  }
}

Reviews.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  productId: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(reviewPropType).isRequired,
};

const mapStateToProps = state => ({
  loading: getReviewsFetching(state.reviews),
  reviews: getReviews(state.reviews),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchReviews }, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);

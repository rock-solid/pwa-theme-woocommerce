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
  componentDidMount() {
    this.readReviews();
  }

  componentDidUpdate(prevProps) {
    if (this.props.productId !== prevProps.productId) {
      this.readReviews();
    }
  }

  readReviews() {
    const { dispatch } = this.props;
    dispatch(fetchReviews(this.props.productId));
  }

  render() {
    return this.props.loading === 1 || _.isEmpty(this.props.reviews) ? null : (
      <Card centered>
        <Card.Content>
          <Card.Header as={Header} size="tiny">
            Reviews
          </Card.Header>
          {this.props.reviews.map(review => <Review key={review.id} rating={review.rating} reviewer={review.name} content={review.review} />)}
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

const mapStateToProps = (state, props) => ({
  loading: getReviewsFetching(state.reviews),
  reviews: getReviews(state.reviews, props.productId),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchReviews }, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);

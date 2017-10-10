import React from 'react';
import PropTypes from 'prop-types';
import Review from './Review';
import { reviewPropType } from './reducer';

const ReviewsList = (props) => {
  const list = props.reviews.map(review => <Review rating={review.rating} reviewer={review.name} content={review.review} />);
  return <div>{list}</div>;
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewPropType).isRequired,
};

export default ReviewsList;

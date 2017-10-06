import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

class Rating extends Component {
  generateStarRating() {
    const stars = Array(5).fill(0);

    stars.fill(1, 0, this.props.rating);

    return stars.map((element) => {
      if (element === 1) {
        return <Icon name="star" color="yellow" />;
      }

      return <Icon name="empty star" color="yellow" />;
    });
  }

  render() {
    return this.props.ratingCount !== null ? (
      <div>
        {this.generateStarRating()} ({this.props.ratingCount})
      </div>
    ) : (
      <div>{this.generateStarRating()}</div>
    );
  }
}

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  ratingCount: PropTypes.number,
};

Rating.defaultProps = {
  ratingCount: null,
};

export default Rating;

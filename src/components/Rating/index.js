import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import './styles.css';

class Rating extends Component {
  generateStarRating() {
    const stars = Array(5).fill(0);

    stars.fill(1, 0, this.props.rating);

    return stars.map((element, index) => {
      if (element === 1) {
        return <Icon key={index} name="star" color="yellow" />;
      }

      return <Icon key={index} name="star outline" color="yellow" />;
    });
  }

  render() {
    if (this.props.ratingCount !== null) {
      return (
        <div>
          {this.generateStarRating()} ({this.props.ratingCount})
        </div>
      );
    }

    return <div className="make-inline">{this.generateStarRating()}</div>;
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

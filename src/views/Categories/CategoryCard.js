import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Card, Button, Header, Segment } from 'semantic-ui-react';
import CircularImage from '../../components/CircularImage';

import './styles.css';

class CategoryCard extends Component {
  render() {
    return (
      <Card centered>
        <Card.Content>
          {this.props.src !== '' ? (
            <CircularImage src={this.props.src} />
          ) : null}
          <Segment basic className="category-meta-container">
            <Card.Header as={Header} className="break-words">
              {this.props.name}
            </Card.Header>
            <Link to={'/category/' + this.props.id}>
              <Button color="purple" compact>
                View Products &gt;
              </Button>
            </Link>
          </Segment>
        </Card.Content>
      </Card>
    );
  }
}

CategoryCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
};

CategoryCard.defaultProps = {
  src: '',
};

export default CategoryCard;

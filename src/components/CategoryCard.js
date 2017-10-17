import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Card, Image, Button, Header } from 'semantic-ui-react';

class CategoryCard extends Component {
  render() {
    return (
      <Card centered>
        <Card.Content>
          {this.props.src !== '' ? (
            <Image floated="left" size="tiny" shape="circular" src={this.props.src} />
          ) : null}
          <Card.Header as={Header}>{this.props.name}</Card.Header>
          <Link to={'/category/' + this.props.categId}>
            <Button color="purple" compact>
              View Products &gt;
            </Button>
          </Link>
        </Card.Content>
      </Card>
    );
  }
}

CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  categId: PropTypes.number.isRequired,
};

CategoryCard.defaultProps = {
  src: '',
};

export default CategoryCard;

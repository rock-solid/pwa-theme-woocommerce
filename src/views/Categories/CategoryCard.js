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
          <Card.Header as={Header} className="break-words">
            {this.props.name}
          </Card.Header>
          <Link to={'/category/' + this.props.id}>
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
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
};

CategoryCard.defaultProps = {
  src: '',
};

export default CategoryCard;

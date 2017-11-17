import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Card, Button, Header } from 'semantic-ui-react';
import config from '../config/config';

import CircularImage from './CircularImage';

class ProductCard extends Component {
  render() {
    const categories = this.props.categories.map(category => category.name);

    return (
      <Card centered>
        <Card.Content>
          <CircularImage src={this.props.src} />
          <Card.Header className="break-words">{this.props.name}</Card.Header>
          <Card.Meta>{categories.join(',')}</Card.Meta>
          <Header as="h3" color="purple">
            <div dangerouslySetInnerHTML={{ __html: config.CURRENCY + this.props.price }} />
          </Header>
        </Card.Content>
        <Card.Content extra>
          <Link to={'/product/' + this.props.id}>
            <Button color="purple" compact>
              Shop Now &gt;
            </Button>
          </Link>
        </Card.Content>
      </Card>
    );
  }
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ProductCard;

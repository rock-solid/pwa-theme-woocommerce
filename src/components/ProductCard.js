import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Card, Image, Button, Header } from 'semantic-ui-react';

class ProductCard extends Component {
  render() {
    const categories = this.props.categories.map(category => <Header.Subheader key={category.id}>{category.name}</Header.Subheader>);

    return (
      <Card centered>
        <Card.Content>
          <Image floated="left" size="tiny" shape="circular" src={this.props.src} />
          <Card.Header as={Header} className="break-words">
            {this.props.name}
            <Header.Subheader>{categories}</Header.Subheader>
            <Header.Subheader as={Header} color="purple" size="huge">
              ${this.props.price}
            </Header.Subheader>
          </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Link to={'/product/' + this.props.productId}>
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
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  productId: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ProductCard;

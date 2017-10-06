import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Card, Image, Icon, Button } from 'semantic-ui-react';
import Rating from './Rating';

class ProductDetails extends Component {
  getCategories() {
    const categories = [];
    this.props.product.categories.forEach((category) => {
      categories.push(category.name);
    });

    return categories.join(', ');
  }

  render() {
    return (
      <div>
        <Header textAlign="center">{this.props.product.name}</Header>
        <Card centered raised>
          <Image src={this.props.product.images[0].src} />
          <Card.Content extra>
            {Number(this.props.product.average_rating) === 0 ? (
              <p>Not yet rated</p>
            ) : (
              <Rating rating={Number(this.props.product.average_rating)} ratingCount={this.props.product.rating_count} />
            )}
          </Card.Content>
          {this.props.product.categories.length === 0 ? null : <Card.Content>Categories: {this.getCategories()}</Card.Content>}
          <Card.Content>Stock: {this.props.product.in_stock ? 'In Stock' : 'Out of Stock'}</Card.Content>
          <Card.Content>Price: {this.props.product.price}$</Card.Content>
          <Button color="purple" fluid>
            ADD TO CART &nbsp;<Icon name="cart" />
          </Button>
        </Card>
        {this.props.product.description.length === 0 ? null : (
          <Card centered raised>
            <Card.Content>
              <Card.Header as={Header} size="tiny">
                Description
              </Card.Header>
              <Card.Description>
                <div dangerouslySetInnerHTML={{ __html: this.props.product.description }} />
              </Card.Description>
            </Card.Content>
          </Card>
        )}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  product: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    }),
  ]).isRequired,
};

export default ProductDetails;

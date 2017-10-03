import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Card, Image } from 'semantic-ui-react';

class ProductDetails extends Component {
  render() {
    return (
      <div>
        <Header textAlign="center">{this.props.product.name}</Header>
        <Card raised centered>
          <Image floated="left" size="tiny" shape="circular" src={null} />
        </Card>
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

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import ProductCard from './ProductCard';

class ProductsList extends Component {
  render() {
    const list = this.props.products.map(element => (
      <ProductCard
        key={element.id}
        id={element.id}
        src={element.images[0].src}
        name={element.name}
        price={element.price}
        categories={element.categories}
      />
    ));

    return (
      <div>
        <Header textAlign="center">{this.props.categoryName}</Header>
        {list}
      </div>
    );
  }
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
        }),
      ),
      categories: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
  categoryName: PropTypes.string.isRequired,
};

export default ProductsList;

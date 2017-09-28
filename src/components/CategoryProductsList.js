import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Loader, Header } from 'semantic-ui-react';
import ProductCard from './ProductCard';

class CategoryProductsList extends Component {
  render() {
    if (this.props.loading === 1) {
      return (
        <div>
          <Header textAlign="center">Category Name</Header>;
          <Loader active />
        </div>
      );
    }

    const list = this.props.categoryProducts.map(element => (
      <ProductCard
        key={element.id}
        id={element.id}
        src={element.images[0].src}
        name={element.name}
        price={element.price}
        category={element.categories[0].name}
      />
    ));

    return (
      <div>
        <Header textAlign="center">Category Name</Header>
        {list}
      </div>
    );
  }
}

CategoryProductsList.propTypes = {
  loading: PropTypes.number.isRequired,
  categoryProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.shape({
        src: PropTypes.string,
      }),
      price: PropTypes.string.isRequired,
      images: PropTypes.array.isRequired,
      categories: PropTypes.array.isRequired,
    }),
  ).isRequired,
};

export default CategoryProductsList;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';
import CategoryCard from './CategoryCard';

class CategoriesList extends Component {
  render() {
    if (this.props.loading === 1) {
      return (
        <div>
          <Loader active />
        </div>
      );
    }

    const list = this.props.categories.map(element => (
      <CategoryCard key={element.id} categId={element.id} src={element.image.src} name={element.name} />
    ));

    return <div>{list}</div>;
  }
}

CategoriesList.propTypes = {
  loading: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.shape({
          src: PropTypes.string,
        }),
      ]),
    }),
  ).isRequired,
};

export default CategoriesList;

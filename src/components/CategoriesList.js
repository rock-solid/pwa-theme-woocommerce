import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';
import CategoryCard from './CategoryCard';

class CategoriesList extends Component {
  render() {
    const list = this.props.categories.map(element => <CategoryCard key={element.id} src={element.image.src} name={element.name} />);
    return (
      <div>
        <Loader active={Boolean(this.props.loading)} />
        {list}
      </div>
    );
  }
}

CategoriesList.propTypes = {
  loading: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.shape({
        src: PropTypes.string,
      }),
    }),
  ).isRequired,
};

export default CategoriesList;

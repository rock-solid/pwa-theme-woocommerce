import React from 'react';
import PropTypes from 'prop-types';
import CategoryCard from './CategoryCard';

const CategoriesList = (props) => {
  const list = props.categories.map(element => <CategoryCard key={element.id} categId={element.id} src={element.image.src} name={element.name} />);
  return <div>{list}</div>;
};

CategoriesList.propTypes = {
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

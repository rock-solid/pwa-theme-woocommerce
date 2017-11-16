import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { categoryPropType } from './reducer';
import CategoryCard from './CategoryCard';

const CategoriesList = (props) => {
  if (_.isNil(props.categories) || _.isEmpty(props.categories)) {
    return <div> No categories to display </div>;
  }
  const list = props.categories.map(element => (
    <CategoryCard key={element.id} id={element.id} src={_.isEmpty(element.image) ? '' : element.image.src} name={element.name} />
  ));
  return <div>{list}</div>;
};

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(categoryPropType).isRequired,
};

export default CategoriesList;

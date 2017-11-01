import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchVariations } from './actions';
import { getVariationsFetching, getVariations, variationPropType } from './reducer';
import VariationsDropdown from './VariationsDropdown';

class Variations extends Component {
  componentWillMount() {
    this.readVariations(this.props.productId);
  }

  getVariationsByProduct() {
    return this.props.variations.filter(variation => !_.isNil(_.find(this.props.variationIds, element => element === variation.id)));
  }

  readVariations(productId) {
    const { dispatch } = this.props;
    dispatch(fetchVariations(productId));
  }

  render() {
    if (this.props.loading === 0 && !_.isEmpty(this.props.variations)) {
      return <VariationsDropdown variations={this.getVariationsByProduct()} />;
    }

    return null;
  }
}

Variations.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  variations: PropTypes.arrayOf(variationPropType).isRequired,
  variationIds: PropTypes.array.isRequired,
  productId: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  loading: getVariationsFetching(state.variations),
  variations: getVariations(state.variations),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchVariations }, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(Variations);

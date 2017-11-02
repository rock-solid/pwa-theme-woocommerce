import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchVariations } from './actions';
import { getVariationsFetching, getVariations, variationPropType } from './reducer';
import VariationsDropdown from './VariationsDropdown';

class Variations extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      selections: {},
    };
  }

  componentWillMount() {
    this.readVariations(this.props.productId);
  }

  getVariationsByProduct() {
    return this.props.variations.filter(variation => !_.isNil(_.find(this.props.variationIds, element => element === variation.id)));
  }

  getVariationIdBySelections() {
    const attributesArray = {};

    // build an array with attributes for easier processing
    _.forEach(this.props.variations, (variation) => {
      attributesArray[variation.id] = variation.attributes;
    });

    // create an array that will contain the filtered values and initialize it by filtering based on the first option
    const selections = Object.values(this.state.selections);
    let filteredAttributes = _.filter(attributesArray, attributeArray => !_.isNil(_.find(attributeArray, ['option', selections[0]])));

    // filter the array for each of the selections untill we arrive at an element that has all the selection values
    _.forEach(this.state.selections, (selection, index) => {
      if (index !== 0) {
        filteredAttributes = filteredAttributes.filter(filteredAttribute => !_.isNil(_.find(filteredAttribute, ['option', selection])));
      }
    });

    // return the key of the variation that matches the filtered element
    return _.findKey(attributesArray, attributeArray => attributeArray === _.head(filteredAttributes));
  }

  handleSelect(option, value) {
    const selections = this.state.selections;
    selections[option] = value;

    this.setState({
      selections,
    });

    if (_.size(this.state.selections) === this.props.variations[0].attributes.length) {
      this.props.sendSelections(this.state.selections, this.getVariationIdBySelections());
    }
  }

  readVariations(productId) {
    const { dispatch } = this.props;
    dispatch(fetchVariations(productId));
  }

  render() {
    if (this.props.loading === 0 && !_.isEmpty(this.props.variations)) {
      return <VariationsDropdown handleSelect={this.handleSelect} variations={this.getVariationsByProduct()} />;
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
  sendSelections: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: getVariationsFetching(state.variations),
  variations: getVariations(state.variations),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchVariations }, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(Variations);

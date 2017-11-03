import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { toastr } from 'react-redux-toastr';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Header, Card, Icon, Button } from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
import SocialBox from '../../components/SocialBox';
import { productPropType } from '../Products/reducer';
import { addProduct } from '../Cart/actions';
import Rating from '../../components/Rating';
import Reviews from '../../components/Reviews';
import Variations from '../../components/Variations';

import './styles.css';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selections: null,
      variationId: null,
    };

    this.receiveSelections = this.receiveSelections.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  getCategories() {
    return this.props.product.categories.reduce(
      (categString, category, index) => categString + category.name + (index === this.props.product.categories.length - 1 ? '' : ', '),
      ' ',
    );
  }

  getImageGallery() {
    return this.props.product.images.map(image => ({ original: image.src }));
  }

  receiveSelections(selections, variationId) {
    this.setState({
      selections,
      variationId,
    });
  }

  addItem() {
    if (this.props.product.variations.length !== 0) {
      if (_.isNull(this.state.selections)) {
        toastr.warning('Please make a selection for all of the products actions');
        return;
      }
    }

    const { dispatch } = this.props;
    const product = this.props.product;

    toastr.success('Added to Cart', product.name + ' was added to your shopping cart.');
    dispatch(addProduct(product.id, product.name, product.price, product.images[0].src, Number(this.state.variationId), this.state.selections));
  }

  render() {
    return (
      <div>
        <Header textAlign="center" className="break-words">
          {this.props.product.name}
        </Header>
        <Card centered>
          <ImageGallery items={this.getImageGallery()} slideDuration={550} showPlayButton={false} showThumbnails={false} />
          {this.props.product.rating_count > 0 ? (
            <Card.Content extra>
              <Rating rating={Math.round(Number(this.props.product.average_rating))} ratingCount={this.props.product.rating_count} />
            </Card.Content>
          ) : null}
          {this.props.product.categories.length === 0 ? null : <Card.Content>Categories: {this.getCategories()}</Card.Content>}
          <Card.Content>Stock: {this.props.product.in_stock ? 'In Stock' : 'Out of Stock'}</Card.Content>
          <Card.Content>Price: ${this.props.product.price}</Card.Content>
          {this.props.product.variations.length === 0 ? null : (
            <Variations sendSelections={this.receiveSelections} productId={this.props.product.id} variationIds={this.props.product.variations} />
          )}
          <Button color="purple" fluid onClick={this.addItem}>
            ADD TO CART &nbsp;<Icon name="cart" />
          </Button>
        </Card>
        {this.props.product.description.length === 0 ? null : (
          <Card centered>
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
        <Reviews productId={this.props.product.id} />
        <SocialBox permalink={this.props.product.permalink} />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  product: productPropType.isRequired,
};

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ addProduct }, dispatch));
}

export default connect(null, mapDispatchToProps)(ProductDetails);

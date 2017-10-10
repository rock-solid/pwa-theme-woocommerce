import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Card, Image, Icon, Button, Grid } from 'semantic-ui-react';
import { ShareButtons } from 'react-share';
import { productPropType } from '../Products/reducer';
import { addProduct } from '../Cart/actions';
import Rating from '../../components/Rating';
import './styles.css';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
  }

  getCategories() {
    return this.props.product.categories.reduce(
      (categString, category, index) => categString + category.name + (index === this.props.product.categories.length - 1 ? '' : ', '),
      ' ',
    );
  }

  addItem() {
    const { dispatch } = this.props;
    const product = this.props.product;
    dispatch(addProduct(product.id, product.name, product.price, product.images[0].src));
  }

  render() {
    return (
      <div>
        <Header textAlign="center">{this.props.product.name}</Header>
        <Card centered raised>
          <Image src={this.props.product.images[0].src} />
          {Number(this.props.product.average_rating) === 0 ? null : (
            <Card.Content extra>
              <Rating rating={Number(this.props.product.average_rating)} ratingCount={this.props.product.rating_count} />
            </Card.Content>
          )}
          {this.props.product.categories.length === 0 ? null : <Card.Content>Categories: {this.getCategories()}</Card.Content>}
          <Card.Content>Stock: {this.props.product.in_stock ? 'In Stock' : 'Out of Stock'}</Card.Content>
          <Card.Content>Price: {this.props.product.price}$</Card.Content>
          <Button color="purple" fluid onClick={this.addItem}>
            ADD TO CART &nbsp;<Icon name="cart" />
          </Button>
        </Card>
        {this.props.product.description.length === 0 ? null : (
          <Card centered raised>
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
        <Card centered raised>
          <Card.Content>
            <Card.Header as={Header} size="tiny">
              Share product
            </Card.Header>
            <Grid doubling centered>
              <Grid.Row>
                <Grid.Column width={4}>
                  <ShareButtons.FacebookShareButton className="no-outline" url={this.props.product.permalink}>
                    <Icon name="facebook f" color="purple" size="big" />
                  </ShareButtons.FacebookShareButton>
                </Grid.Column>
                <Grid.Column width={4}>
                  <ShareButtons.GooglePlusShareButton className="no-outline" url={this.props.product.permalink}>
                    <Icon name="google plus" color="purple" size="big" />
                  </ShareButtons.GooglePlusShareButton>
                </Grid.Column>
                <Grid.Column width={4}>
                  <ShareButtons.TwitterShareButton className="no-outline" url={this.props.product.permalink}>
                    <Icon name="twitter" color="purple" size="big" />
                  </ShareButtons.TwitterShareButton>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
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

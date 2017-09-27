import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Card, Image, Button, Grid, Header } from 'semantic-ui-react';

class ProductCard extends Component {
  render() {
    return (
      <Card raised centered>
        <Card.Content>
          <Image floated="left" size="tiny" shape="circular" src={this.props.src} />
          <Grid>
            <Grid.Row>
              <Card.Header as={Header}>
                {this.props.name}
                <Header.Subheader>{this.props.category}</Header.Subheader>
                <Header.Subheader as={Header} color="purple" size="huge">
                  <br />
                  {this.props.price}$
                </Header.Subheader>
              </Card.Header>
            </Grid.Row>
            <Grid.Row>
              <Button color="purple" compact>
                Shop Now &gt;
              </Button>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    );
  }
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  price: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

ProductCard.defaultProps = {
  src: 'placeholderurl',
};

export default ProductCard;

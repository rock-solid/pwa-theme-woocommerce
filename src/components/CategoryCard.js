import PropTypes from 'prop-types';
import React from 'react';
import { Card, Image, Button, Grid, Header } from 'semantic-ui-react';

const CategoryCard = {
  render() {
    return (
      <Card raised centered>
        <Card.Content>
          <Image floated="left" size="tiny" shape="circular" src={this.props.src} />
          <Grid>
            <Grid.Row>
              <Card.Header as={Header}>{this.props.name}</Card.Header>
            </Grid.Row>
            <Grid.Row>
              <Button color="purple" compact>
                View Products &gt;
              </Button>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    );
  },
};

CategoryCard.PropTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default CategoryCard;

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Card, Image, Button, Grid, Header } from 'semantic-ui-react';

class CategoryCard extends Component {
  render() {
    return (
      <Card raised centered>
        <Card.Content>
          {this.props.src !== '' ? <Image floated="left" size="tiny" shape="circular" src={this.props.src} /> : null}
          <Grid>
            <Grid.Row>
              <Card.Header as={Header}>{this.props.name}</Card.Header>
            </Grid.Row>
            <Grid.Row>
              <Link to={'/category/' + this.props.categId}>
                <Button color="purple" compact>
                  View Products &gt;
                </Button>
              </Link>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    );
  }
}

CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  categId: PropTypes.number.isRequired,
};

CategoryCard.defaultProps = {
  src: '',
};

export default CategoryCard;

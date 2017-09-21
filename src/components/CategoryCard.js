import React, { Component } from 'react';
import { Card, Image, Button, Grid, Header } from 'semantic-ui-react';


export default class CategoryCard extends Component {

  render() {
    return (
      <Card raised centered>
        <Card.Content>
          <Image floated="left" size="tiny" shape="circular" src={this.props.src} />
          <Grid>
            <Grid.Row>
              <Card.Header as={Header}>
                {this.props.name}
              </Card.Header>
            </Grid.Row>
            <Grid.Row>
              <Button color="purple" compact>
                                View Products >
              </Button>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    );
  }

}

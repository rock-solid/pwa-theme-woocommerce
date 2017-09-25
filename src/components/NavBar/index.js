import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Segment, Icon } from 'semantic-ui-react';
import { openMenu } from './actions';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.showSidebar = this.showSidebar.bind(this);
  }

  showSidebar(e) {
    e.stopPropagation();
    this.props.openMenu();
  }

  render() {
    return (
      <Segment basic color="purple" inverted size="tiny">
        <Grid columns="three" relaxed>
          <Grid.Row>
            <Grid.Column floated="left" width={1}>
              <Icon name="content" size="large" onClick={this.showSidebar} />
            </Grid.Column>
            <Grid.Column>MY SHOP</Grid.Column>
            <Grid.Column>
              <Icon name="search" size="large" />
              <Icon name="cart" size="large" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

NavBar.propTypes = {
  openMenu: PropTypes.func.isRequired,
};

export default connect(null, { openMenu })(NavBar);

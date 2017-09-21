import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Sidebar, Segment, Icon } from "semantic-ui-react";

import SideMenu from "./components/SideMenu";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { visible: false };

    this.showSidebar = this.showSidebar.bind(this);
    this.hideSidebar = this.hideSidebar.bind(this);
  }

  showSidebar(e) {
    e.stopPropagation();
    this.setState({
      visible: true
    });
  }

  hideSidebar() {
    if (this.state.visible) {
      this.setState({
        visible: false
      });
    }
  }

  render() {
    return (
      <Sidebar.Pushable>
        <SideMenu isVisible={this.state.visible} />
        <Sidebar.Pusher dimmed={this.state.visible} onClick={this.hideSidebar}>
          <Segment basic color="purple" inverted size="tiny">
            <Grid columns="three" relaxed>
              <Grid.Row>
                <Grid.Column floated="left" width={1}>
                  <Icon
                    name="content"
                    size="large"
                    onClick={this.showSidebar}
                  />
                </Grid.Column>
                <Grid.Column>MY SHOP</Grid.Column>
                <Grid.Column>
                  <Icon name="search" size="large" />
                  <Icon name="cart" size="large" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          {this.props.children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

App.defaultProps = {
  children: null
};

export default App;

import React, { Component } from 'react';
import { CategoryCard } from './components/CategoryCard.js';
import { Grid, Sidebar, Segment, Menu, Icon, Header } from 'semantic-ui-react';

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
      visible: true,
    });
  }

  hideSidebar() {
    if (this.state.visible) {
      this.setState({
        visible: false,
      });
    }
  }

  render() {
    return (
      <Sidebar.Pushable >
        <Sidebar as={Menu} animation="overlay" width="thin" visible={this.state.visible} icon="labeled" vertical inverted color="purple">
          <Header as="h2" inverted>
              MENU
          </Header>
          <Menu.Item name="categories">
            <Icon name="browser" />Categories
          </Menu.Item>
          <Menu.Item name="ordering">
            <Icon name="shopping basket" />Ordering Online
          </Menu.Item>
          <Menu.Item name="service">
            <Icon name="setting" />Customer Service
          </Menu.Item>
          <Menu.Item name="shipping">
            <Icon name="truck" />Shipping
          </Menu.Item>
          <Menu.Item name="locations">
            <Icon name="marker" />Locations
          </Menu.Item>
          <Menu.Item name="contact">
            <Icon name="envelope" />Contact
          </Menu.Item>
          <Menu.Item name="account">
            <Icon name="user" />User Account
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher dimmed={this.state.visible} onClick={this.hideSidebar}>
          <Segment basic color="purple" inverted size="tiny">
            <Grid columns="three" relaxed>
              <Grid.Row>
                <Grid.Column floated="left" width={1}>
                  <Icon name="content" size="large" onClick={this.showSidebar} />
                </Grid.Column>
                <Grid.Column>
                        MY SHOP
                </Grid.Column>
                <Grid.Column>
                  <Icon name="search" size="large" />
                  <Icon name="cart" size="large" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Header textAlign="center">
              CATEGORIES
          </Header>

          <CategoryCard src="http://vignette2.wikia.nocookie.net/wiiu/images/5/5e/New-Super-Mario-Bros-Art-21-400x400.jpg" name="Apples" />


          <CategoryCard src="http://vignette2.wikia.nocookie.net/wiiu/images/5/5e/New-Super-Mario-Bros-Art-21-400x400.jpg" name="Apples" />


          <CategoryCard src="http://vignette2.wikia.nocookie.net/wiiu/images/5/5e/New-Super-Mario-Bros-Art-21-400x400.jpg" name="Apples" />


          <CategoryCard src="http://vignette2.wikia.nocookie.net/wiiu/images/5/5e/New-Super-Mario-Bros-Art-21-400x400.jpg" name="Apples" />

        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default App;

import React from 'react';
import PropTypes from 'prop-types';
import { Sidebar, Menu, Icon, Header } from 'semantic-ui-react';

const SideMenu = props => (
  <Sidebar as={Menu} animation="overlay" width="thin" visible={props.isVisible} icon="labeled" vertical inverted color="purple">
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
);

SideMenu.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default SideMenu;

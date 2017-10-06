import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Icon, Label, Menu } from 'semantic-ui-react';
import { openMenu } from './actions';
import { getCart } from '../../views/Cart/reducer';
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.showSidebar = this.showSidebar.bind(this);
  }

  getQuantity() {
    const cart = this.props.cart;
    return cart.reduce((quantity, item) => item.quantity + quantity, 0);
  }

  showSidebar(e) {
    e.stopPropagation();
    this.props.openMenu();
  }

  render() {
    return (
      <Segment basic color="purple" inverted size="small" className="nav-bar">
        <Menu fluid secondary>
          <Menu.Item onClick={this.showSidebar} fitted>
            <Icon name="content" size="large" onClick={this.showSidebar} className="shop-icon" />
          </Menu.Item>
          <Menu.Item className="shop-name" fitted>
            <Link to="/">MY SHOP</Link>
          </Menu.Item>
          <Menu.Item position="right" fitted>
            <Menu.Item fitted>
              <Icon name="search" size="large" className="shop-icon" />
            </Menu.Item>
            <Menu.Item fitted>
              <Icon.Group>
                <Link to="/cart" className="cart-link">
                  <Icon name="cart" size="large" className="shop-icon" />
                  {_.isEmpty(this.props.cart) ? null : (
                    <Label color="orange" size="mini" floating circular content={this.getQuantity()} className="cart-counter" />
                  )}
                </Link>
              </Icon.Group>
            </Menu.Item>
          </Menu.Item>
        </Menu>
      </Segment>
    );
  }
}

NavBar.propTypes = {
  openMenu: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  cart: getCart(state.cart),
});

export default connect(mapStateToProps, { openMenu })(NavBar);

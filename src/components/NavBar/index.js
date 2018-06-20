import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Icon, Label, Menu, Button, Input } from 'semantic-ui-react';
import config from '../../config/config';
import { openMenu, openSearch, closeSearch } from './actions';
import { isSearchVisible } from './reducer';
import { getCart } from '../../views/Cart/reducer';
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.showSidebar = this.showSidebar.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  getQuantity() {
    const { cart } = this.props;
    return cart.reduce((quantity, item) => item.quantity + quantity, 0);
  }

  setSearch(e) {
    this.setState({ search: e.target.value });
  }

  resetSearch() {
    this.setState({ search: '' });
  }

  toggleVisibility() {
    if (this.props.searchVisible) {
      this.props.closeSearch();
    } else {
      this.resetSearch();
      this.props.openSearch();
    }
  }

  showSidebar(e) {
    e.stopPropagation();
    this.props.openMenu();
  }

  render() {
    const { search } = this.state;
    const { searchVisible } = this.props;

    return (
      <Segment basic color="purple" inverted size="small" className="nav-bar">
        <Menu fluid secondary>
          <Menu.Item onClick={this.showSidebar} fitted>
            <Icon name="content" size="large" onClick={this.showSidebar} className="shop-icon" />
          </Menu.Item>
          <Menu.Item className="shop-name" fitted>
            {searchVisible === false ?
              <Link to="/">{config.SHOP_NAME}</Link> :
              (
                <Input
                  name="search"
                  type="text"
                  className="search"
                  value={search}
                  onChange={e => this.setSearch(e)}
                />
              )
            }
          </Menu.Item>
          <Menu.Item position="right" fitted>
            {search && searchVisible ? (
              <Link to={`/search/${search}`} onClick={this.resetSearch}>
                <Button icon="search" circular size="big" />
              </Link>
            ) : (
                <Button icon="search" onClick={this.toggleVisibility} circular size="big" />
              )}
            <Menu.Item fitted>
              <Icon.Group>
                <Link to="/cart" className="cart-link">
                  <Icon name="cart" size="large" className="shop-icon" />
                  {_.isEmpty(this.props.cart) ? null : (
                    <Label
                      color="orange"
                      size="mini"
                      floating
                      circular
                      content={this.getQuantity()}
                      className="cart-counter"
                    />
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
  openSearch: PropTypes.func.isRequired,
  closeSearch: PropTypes.func.isRequired,
  searchVisible: PropTypes.bool.isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  cart: getCart(state.cart),
  searchVisible: isSearchVisible(state.navbar),
});

export default connect(
  mapStateToProps,
  { openMenu, openSearch, closeSearch },
)(NavBar);

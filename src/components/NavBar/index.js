import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Segment, Icon, Label } from 'semantic-ui-react';
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
      <Segment basic color="purple" inverted size="small">
        <Grid columns="three" relaxed>
          <Grid.Row>
            <Grid.Column floated="left" width={1}>
              <Icon name="content" size="large" onClick={this.showSidebar} />
            </Grid.Column>
            <Grid.Column>
              <Link className="shop-name" to="/">
                MY SHOP
              </Link>
            </Grid.Column>
            <Grid.Column>
              <Icon name="search" size="large" />
              <Icon.Group>
                <Link to="/cart" className="cart-link">
                  <Icon name="cart" size="large" />
                  {_.isEmpty(this.props.cart) ? null : (
                    <Label color="orange" size="mini" floating circular content={this.getQuantity()} className="cart-counter" />
                  )}
                </Link>
              </Icon.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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

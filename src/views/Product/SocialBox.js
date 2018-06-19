import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FacebookShareButton, GooglePlusShareButton, TwitterShareButton } from 'react-share';
import { Header, Card, Icon, Grid } from 'semantic-ui-react';

class SocialBox extends Component {
  render() {
    return (
      <Card centered>
        <Card.Content>
          <Card.Header as={Header} size="tiny">
            Share product
          </Card.Header>
          <Grid doubling centered>
            <Grid.Row>
              <Grid.Column width={4}>
                <FacebookShareButton className="no-outline" url={this.props.permalink}>
                  <Icon name="facebook f" color="purple" size="big" />
                </FacebookShareButton>
              </Grid.Column>
              <Grid.Column width={4}>
                <GooglePlusShareButton
                  className="no-outline"
                  url={this.props.permalink}
                >
                  <Icon name="google plus" color="purple" size="big" />
                </GooglePlusShareButton>
              </Grid.Column>
              <Grid.Column width={4}>
                <TwitterShareButton className="no-outline" url={this.props.permalink}>
                  <Icon name="twitter" color="purple" size="big" />
                </TwitterShareButton>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    );
  }
}

SocialBox.propTypes = {
  permalink: PropTypes.string.isRequired,
};

export default SocialBox;

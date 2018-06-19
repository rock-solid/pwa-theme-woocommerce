import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Icon } from 'semantic-ui-react';
import { Offline, Online } from 'react-detect-offline';

import './styles.css';

const CircularImage = props => (
  <div className="circular-image-container">
    <Online>
      <Segment
        className="circular-image"
        circular
        floated="left"
        size="small"
        style={{
          backgroundImage: `url(${props.src})`,
          width: props.width,
          height: props.height,
        }}
      />
    </Online>
    <Offline>
      <Icon name="image" circular size="big" />
    </Offline>
  </div>
);

CircularImage.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

CircularImage.defaultProps = {
  src: '',
  width: 80,
  height: 80,
};

export default CircularImage;

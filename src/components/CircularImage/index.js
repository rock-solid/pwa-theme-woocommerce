import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

import './styles.css';

const CircularImage = props => (
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
);

CircularImage.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

CircularImage.defaultProps = {
  width: 80,
  height: 80,
};

export default CircularImage;

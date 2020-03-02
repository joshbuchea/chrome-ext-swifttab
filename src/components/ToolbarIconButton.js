/*global chrome*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ToolbarIcon,
} from 'rmwc';

function IconButton(props) {
  return (
    <Button
      title={props.title}
      onClick={() => chrome.tabs.update({ url: props.href })}
    >
      <ToolbarIcon use={props.icon} />
    </Button>
  );
}

// IconButton.PropTypes = {
//   href: PropTypes.string.isRequired,
//   icon: PropTypes.string.isRequired,
//   title: PropTypes.string,
// };

export default IconButton;

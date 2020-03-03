/*global chrome*/

import React from 'react';
// import PropTypes from 'prop-types';
import {
  Button,
  ToolbarIcon,
} from 'rmwc';

function IconButton(props) {
  const { href, icon, title } = props;

  return (
    <Button
      title={title}
      onClick={() => chrome.tabs.update({ url: href })}
    >
      <ToolbarIcon use={icon} />
    </Button>
  );
}

// IconButton.PropTypes = {
//   href: PropTypes.string.isRequired,
//   icon: PropTypes.string.isRequired,
//   title: PropTypes.string,
// };

export default IconButton;

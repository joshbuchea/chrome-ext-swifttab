/*global chrome*/

import React from 'react';
// import PropTypes from 'prop-types';

function IconButton(props) {
  const { icon, title, url } = props;

  return (
    <button title={title} onClick={() => chrome.tabs.update({ url })}>
      {title}
    </button>
  );
}

// IconButton.PropTypes = {
//   href: PropTypes.string.isRequired,
//   icon: PropTypes.string.isRequired,
//   title: PropTypes.string,
// };

export default IconButton;

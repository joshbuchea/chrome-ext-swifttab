import React from 'react';
import ToolbarIconButton from './ToolbarIconButton';

function AppToolbar(props) {
  const { handleSearchChange, searchValue, shadow } = props;

  return (
    <div>
      <div>SwiftTab</div>

      <div>
        <input
          value={searchValue}
          onInput={handleSearchChange}
          type="search"
          placeholder="Search"
          autocomplete="off"
          autofocus="autofocus"
          style={{ backgroundColor: "#2850A7", color: "#fff" }}
        />
      </div>

      <div>
        <ToolbarIconButton
          title="Bookmarks"
          icon="star"
          url="chrome://bookmarks/"
        />
        <ToolbarIconButton
          title="Tabs"
          icon="tab"
          url="chrome://history/syncedTabs"
        />
        <ToolbarIconButton
          title="History"
          icon="history"
          url="chrome://history"
        />
        <ToolbarIconButton
          title="Downloads"
          icon="file_download"
          url="chrome://downloads/"
        />
      </div>
    </div>
  );
}

export default AppToolbar;

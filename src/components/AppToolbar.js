import React from 'react';
import ToolbarIconButton from './ToolbarIconButton';

const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

function AppToolbar(props) {
  const { handleSearchChange, searchValue } = props;
  const bookmarksButtonLabel =
    window.navigator.userAgent.indexOf('Edg') > -1 ? 'Favorites' : 'Bookmarks';

  return (
    <div className="app-toolbar">
      <div class="app-title">SwiftTab</div>

      <div>
        <input
          autocomplete="off"
          autofocus="autofocus"
          onInput={handleSearchChange}
          placeholder="Search"
          // style={{ backgroundColor: "#2850A7", color: "#fff" }}
          type="search"
          value={searchValue}
        />
      </div>

      <div>
        {!isFirefox && (
          <>
            <ToolbarIconButton
              icon="star"
              title="Bookmarks"
              url="chrome://bookmarks/"
            />
            {/* <ToolbarIconButton
              icon="tab"
              title="Tabs"
              url="chrome://history/syncedTabs"
            /> */}
            <ToolbarIconButton
              icon="history"
              title="History"
              url="chrome://history"
            />
            <ToolbarIconButton
              icon="file_download"
              title="Downloads"
              url="chrome://downloads/"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default AppToolbar;

import React from 'react';
import {
  TextField,
  TextFieldIcon,
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
} from 'rmwc';
import ToolbarIconButton from './ToolbarIconButton';

function AppToolbar(props) {
  const { handleSearchChange, searchValue, shadow } = props;

  return (
    <Toolbar fixed data-shadow={shadow}>
      <ToolbarRow>
        <ToolbarSection alignStart>
          <ToolbarTitle>SwiftTab</ToolbarTitle>
        </ToolbarSection>

        <ToolbarSection>
          <TextField
            box
            withLeadingIcon={<TextFieldIcon use="search" />}
            value={searchValue}
            onInput={handleSearchChange}
            type="search"
            placeholder="Search"
            autocomplete="off"
            autofocus="autofocus"
            style={{ backgroundColor: '#2850A7', color: '#fff' }}
          />
        </ToolbarSection>

        <ToolbarSection alignEnd>
          <ToolbarIconButton title="Bookmarks" url="chrome://bookmarks/" icon="star" />
          <ToolbarIconButton title="Tabs" url="chrome://history/syncedTabs" icon="tab" />
          <ToolbarIconButton title="History" url="chrome://history" icon="history" />
          <ToolbarIconButton title="Downloads" url="chrome://downloads/" icon="file_download" />
        </ToolbarSection>
      </ToolbarRow>
    </Toolbar>
  );
}

export default AppToolbar;

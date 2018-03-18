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
  return (
    <Toolbar fixed data-shadow={props.shadow}>
      <ToolbarRow>
        <ToolbarSection alignStart>
          <ToolbarTitle>SwiftTab</ToolbarTitle>
        </ToolbarSection>

        <ToolbarSection>
          <TextField
            box
            withLeadingIcon={<TextFieldIcon use="search" />}
            value={props.searchValue}
            onInput={props.handleSearchChange}
            type="search"
            placeholder="Search"
            autocomplete="off"
            autofocus="autofocus"
            style={{ backgroundColor: '#2850A7', color: '#fff' }}
          />
        </ToolbarSection>

        <ToolbarSection alignEnd>
          <ToolbarIconButton title="Bookmarks" href="chrome://bookmarks/" icon="star" />
          <ToolbarIconButton title="Tabs" href="chrome://history/syncedTabs" icon="tab" />
          <ToolbarIconButton title="History" href="chrome://history" icon="history" />
          <ToolbarIconButton title="Downloads" href="chrome://downloads/" icon="file_download" />
        </ToolbarSection>
      </ToolbarRow>
    </Toolbar>
  );
}

export default AppToolbar;

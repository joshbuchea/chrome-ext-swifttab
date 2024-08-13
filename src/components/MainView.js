/*global chrome*/
/*global browser*/

import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import AppToolbar from './AppToolbar';
import BookmarksView from './BookmarksView';

function browserTabsQuery(queryInfo) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query(queryInfo, tabs => resolve(tabs));
  });
}

// async function getTabs() {
//   const tabs = await browserTabsQuery({});
//   console.log('tabs:', tabs);
//   console.log('tabs length:', tabs.length);
//   return tabs;
// }

// async function getActiveTab() {
//   console.log('getActiveTab');
//   const tabs = await browserTabsQuery({ active: true, currentWindow: true });
//   console.log('tabs:', tabs);
//   return tabs[0];
// }

function useBookmarks(folderName) {
  const [bookmarks, setBookmarks] = useState([]);

  const updateBookmarks = folder => {
    setBookmarks(folder.children || []);
  };

  useEffect(() => {
    function getBookmarks() {
      // Search bookmarks for folder
      chrome.bookmarks.search(
        {
          url: null,
          title: folderName,
        },
        results => {
          // If results, parse bookmarks
          results.length &&
            chrome.bookmarks.getSubTree(results[0].id, data =>
              updateBookmarks(data[0])
            );

          // Fallback to Bookmarks Bar
          !results.length &&
            chrome.bookmarks.getSubTree('1', data => updateBookmarks(data[0]));
        }
      );
    }

    // Add event listeners
    if (chrome) {
      chrome.bookmarks.onCreated.addListener(getBookmarks);
      chrome.bookmarks.onRemoved.addListener(getBookmarks);
      chrome.bookmarks.onChanged.addListener(getBookmarks);
      chrome.bookmarks.onMoved.addListener(getBookmarks);
      if (chrome.bookmarks.onChildrenReordered) {
        chrome.bookmarks.onChildrenReordered.addListener(getBookmarks);
      }
    }

    // get bookmarks
    getBookmarks();

    return function cleanup() {
      // Remove event listeners
      if (chrome) {
        chrome.bookmarks.onCreated.removeListener(getBookmarks);
        chrome.bookmarks.onRemoved.removeListener(getBookmarks);
        chrome.bookmarks.onChanged.removeListener(getBookmarks);
        chrome.bookmarks.onMoved.removeListener(getBookmarks);
        if (chrome.bookmarks.onChildrenReordered) {
          chrome.bookmarks.onChildrenReordered.removeListener(getBookmarks);
        }
      }
    };
  }, [folderName]);

  return bookmarks;
}

function useTabs() {
  const [tabs, setTabs] = useState([]);

  const updateTabs = tabs => {
    setTabs(tabs);
  };

  useEffect(() => {
    function getTabs() {
      // Search bookmarks for folder
      chrome.tabs.query({}, tabs => {
        console.log('tabs:', tabs);
        console.log('tabs length:', tabs.length);
        updateTabs(tabs);
      });
    }

    // Add event listeners
    if (chrome) {
      chrome.tabs.onCreated.addListener(getTabs);
      chrome.tabs.onRemoved.addListener(getTabs);
      chrome.tabs.onUpdated.addListener(getTabs);
      chrome.tabs.onMoved.addListener(getTabs);
      if (chrome.tabs.onReplaced) {
        chrome.tabs.onReplaced.addListener(getTabs);
      }
    }

    // get bookmarks
    getTabs();

    return function cleanup() {
      // Remove event listeners
      if (chrome) {
        chrome.tabs.onCreated.removeListener(getTabs);
        chrome.tabs.onRemoved.removeListener(getTabs);
        chrome.tabs.onUpdated.removeListener(getTabs);
        chrome.tabs.onMoved.removeListener(getTabs);
        if (chrome.tabs.onReplaced) {
          chrome.tabs.onReplaced.removeListener(getTabs);
        }
      }
    };
  }, []);

  return tabs;
}

function firstUnpinnedTab(tabs) {
  for (let tab of tabs) {
    if (!tab.pinned) {
      return tab.index;
    }
  }
}

function TabActionButton(props) {
  const { icon, onClick, title } = props;
  const _onClick = event => {
    if (onClick) {
      onClick(event);
    }
    event.stopPropagation();
  };

  return (
    <button onClick={_onClick} title={title}>
      {icon ? icon : title}
    </button>
  );
}

// font awesome - clone - solid
const SVG_COPY = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 512 512"
  >
    <path d="M288 448H64V224h64V160H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64zm-64-96H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64z" />
  </svg>
);

const SVG_COPY_REGULAR = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 512 512"
  >
    <path d="M448 384H256c-35.3 0-64-28.7-64-64V64c0-35.3 28.7-64 64-64H396.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V320c0 35.3-28.7 64-64 64zM64 128h96v48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H256c8.8 0 16-7.2 16-16V416h48v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192c0-35.3 28.7-64 64-64z" />
  </svg>
);

// font awesome - rotate right - solid
const SVG_RELOAD = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 512 512"
  >
    <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
  </svg>
);

// font awesome - thumbtack - solid
const SVG_PIN = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 512 512"
  >
    <path d="M32 32C32 14.3 46.3 0 64 0H320c17.7 0 32 14.3 32 32s-14.3 32-32 32H290.5l11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3H32c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64H64C46.3 64 32 49.7 32 32zM160 384h64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384z" />
  </svg>
);

// font awesome - xmark - solid
const SVG_CLOSE = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 512 512"
  >
    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
  </svg>
);

const SVG_CIRCLE_XMARK = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 512 512"
  >
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
  </svg>
);

const SVG_VOLUME_XMARK = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 512 512"
  >
    <path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z" />
  </svg>
);

const SVG_VOLUME_OFF = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 512 512"
  >
    <path d="M320 64c0-12.6-7.4-24-18.9-29.2s-25-3.1-34.4 5.3L131.8 160H64c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64h67.8L266.7 471.9c9.4 8.4 22.9 10.4 34.4 5.3S320 460.6 320 448V64z" />
  </svg>
);

const SVG_LEFT_LONG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 512 512"
  >
    <path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z" />
  </svg>
);

const SVG_RIGHT_LONG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 512 512"
  >
    <path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z" />
  </svg>
);

function MainView({ folderName = '_Swift' }) {
  const bookmarks = useBookmarks(folderName);
  const tabs = useTabs();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = event =>
    setSearchQuery(event.target.value.toLowerCase());

  const handleScrollChange = event => {
    const isScrolledCurrent = event.target.scrollTop > 0 ? true : false;
    isScrolledCurrent !== isScrolled && setIsScrolled(isScrolledCurrent);
  };

  const filterBookmarks = (bookmarks, filter) => {
    // Clone bookmarks
    bookmarks = JSON.parse(JSON.stringify(bookmarks));

    // Filter bookmarks
    const bookmarksFiltered = bookmarks
      .map(folder => {
        folder.children &&
          (folder.children = folder.children.filter(bookmark =>
            filter
              ? bookmark.url && bookmark.title.toLowerCase().includes(filter)
              : bookmark.url
          ));
        return folder;
      })
      .filter(folder => folder.children && folder.children.length);

    return bookmarksFiltered;
  };

  const bookmarksFiltered = filterBookmarks(bookmarks, searchQuery);

  const tabsFiltered = tabs.filter(tab =>
    tab.title.toLowerCase().includes(searchQuery)
  );

  useEffect(() => {
    document.addEventListener(
      'contextmenu',
      event => {
        console.log('event:', event);
        const foo = event.target.closest('.foo');
        if (foo) {
          console.log('foo:', foo);
          console.log('foo.dataset:', foo.dataset);
          // When the context menu is opened on an element with the foo class
          // set the context to "opening a tab context menu".
          chrome.menus.overrideContext({
            context: 'tab',
            tabId: parseInt(foo.dataset.tabid),
          });
        }
      },
      { capture: true }
    );
  }, []);

  const msg = searchQuery ? (
    <div class="no-bookmarks">No search results found</div>
  ) : (
    <div class="no-bookmarks fadein">
      Bookmarks in <strong>Bookmarks Bar</strong> or{' '}
      <strong>{folderName}</strong> appear here
    </div>
  );

  const bookmarksView = !bookmarksFiltered.length ? (
    msg
  ) : (
    <BookmarksView
      data={bookmarksFiltered}
      handleScrollChange={handleScrollChange}
    />
  );

  return (
    <div className="App">
      <AppToolbar
        handleSearchChange={handleSearchChange}
        searchValue={searchQuery}
        shadow={isScrolled}
      />
      {/* TODO: add style for pinned tabs */}
      {/* TODO: sort/group tabs */}
      {/* TODO: add drag/drop move functionality */}
      {/* TODO: show tabs count (current window, maybe overall total) */}
      {/* TODO: add create new tab button */}
      {/* TODO: add close tabs to left button? */}
      {/* TODO: add close tabs to right button? */}
      <div className="tabs-view">
        <div>{tabs.length} tabs</div>
        <div className="tabs-view-buttons">
          <button
            onClick={() => {
              const tabsByURL = {};
              tabs.forEach(tab => {
                if (tabsByURL[tab.url]) {
                  if (!tab.active) {
                    chrome.tabs.remove(tab.id);
                  }
                }
                tabsByURL[tab.url] = true;
              });
            }}
          >
            Close duplicate tabs
          </button>
        </div>

        {tabs && (
          <ul>
            {tabsFiltered.map(tab => (
              <li
                // className="foo"
                className={`foo ${tab.pinned ? 'pinned' : ''}`}
                data-tabId={tab.id}
                draggable="true"
                key={tab.id}
                onClick={() => chrome.tabs.update(tab.id, { active: true })}
              >
                <div
                  style={{ backgroundImage: `url(${tab.favIconUrl})` }}
                  title={tab.title}
                >
                  {tab.title}
                </div>

                <div className="tab-action-buttons">
                  <TabActionButton
                    icon={SVG_CIRCLE_XMARK}
                    onClick={() => chrome.tabs.remove(tab.id)}
                    title="Close tab"
                  />
                  <TabActionButton
                    icon={SVG_COPY_REGULAR}
                    onClick={() => chrome.tabs.duplicate(tab.id)}
                    title="Duplicate tab"
                  />
                  <TabActionButton
                    icon={SVG_PIN}
                    onClick={() => {
                      chrome.tabs.update(tab.id, { pinned: !tab.pinned });
                    }}
                    title={tab.pinned ? 'Unpin tab' : 'Pin tab'}
                  />
                  <TabActionButton
                    icon={SVG_RELOAD}
                    onClick={() => chrome.tabs.reload(tab.id)}
                    title="Reload tab"
                  />
                  <TabActionButton
                    icon={SVG_VOLUME_OFF}
                    onClick={() => {
                      const muted = !tab.mutedInfo.muted;
                      chrome.tabs.update(tab.id, { muted });
                    }}
                    title={tab.mutedInfo.muted ? 'Unmute tab' : 'Mute tab'}
                  />
                  <TabActionButton
                    icon={SVG_LEFT_LONG}
                    onClick={() => {
                      const index = tab.pinned ? 0 : firstUnpinnedTab(tabs);
                      chrome.tabs.move(tab.id, { index });
                    }}
                    title="Move tab to First"
                  />
                  <TabActionButton
                    icon={SVG_RIGHT_LONG}
                    onClick={() => {
                      const index = tab.pinned
                        ? firstUnpinnedTab(tabs) - 1
                        : -1;
                      chrome.tabs.move(tab.id, { index });
                    }}
                    title="Move tab to Last"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* {bookmarksView} */}
    </div>
  );
}

export default MainView;

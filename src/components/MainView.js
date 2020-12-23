/*global chrome*/

import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import AppToolbar from './AppToolbar';
import BookmarksView from './BookmarksView';

function useBookmarksFolder(folder) {
  const [bookmarks, setBookmarks] = useState([]);

  const updateBookmarks = folder => {
    console.log('bookmarks folder: ', folder);
    setBookmarks(folder.children || []);
  };

  useEffect(() => {
    function getBookmarks() {
      // Search bookmarks for folder
      chrome.bookmarks.search(
        {
          url: null,
          title: folder,
        },
        results => {
          // console.log('bookmarks search results: ', results);

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
      chrome.bookmarks.onChildrenReordered.addListener(getBookmarks);
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
        chrome.bookmarks.onChildrenReordered.removeListener(getBookmarks);
      }
    };
  }, [folder]);

  return bookmarks;
}

function MainView({ folder = '_Swift' }) {
  const bookmarks = useBookmarksFolder(folder);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = event =>
    setSearchQuery(event.target.value.toLowerCase());

  const handleScrollChange = event => {
    const isScrolledCurrent = event.target.scrollTop > 0 ? true : false;
    isScrolledCurrent !== isScrolled && setIsScrolled(isScrolledCurrent);
  };

  const filterBookmarks = (bookmarks, filter) => {
    console.log('filter: ', filter);

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

    console.log('filtered bookmarks: ', bookmarksFiltered);

    return bookmarksFiltered;
  };

  const bookmarksFiltered = filterBookmarks(bookmarks, searchQuery);

  const msg = searchQuery ? (
    <div class="no-bookmarks">No search results found</div>
  ) : (
    <div class="no-bookmarks fadein">
      Bookmarks in <strong>Bookmarks Bar</strong> or <strong>{folder}</strong>{' '}
      appear here
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
      {bookmarksView}
    </div>
  );
}

export default MainView;

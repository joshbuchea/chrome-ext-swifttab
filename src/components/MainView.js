import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import AppToolbar from './AppToolbar';
import BookmarksView from './BookmarksView';

function MainView({ bookmarks = [], folder = '_Swift' }) {
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
          (folder.children = folder.children.filter(
            bookmark =>
              filter
                ? bookmark.url && bookmark.title.toLowerCase().includes(filter)
                : bookmark.url
          ));
        return folder;
      })
      .filter(folder => folder.children && folder.children.length);

    console.log('filtered bookmarks: ', bookmarksFiltered);

    return bookmarksFiltered;
  }

  const bookmarksFiltered = filterBookmarks(
    bookmarks,
    searchQuery,
  );

  const msg = searchQuery ? (
    <div class="no-bookmarks">No search results found</div>
  ) : (
    <div class="no-bookmarks fadein">
      Bookmarks in <strong>Bookmarks Bar</strong> or{" "}
      <strong>{folder}</strong> appear here
    </div>
  );

  const bookmarksView = !bookmarksFiltered.length ? (
    msg
  ) : (
    <BookmarksView
      handleScrollChange={handleScrollChange}
      data={bookmarksFiltered}
    />
  );

  return (
    <>
      <AppToolbar
        handleSearchChange={handleSearchChange}
        searchValue={searchQuery}
        shadow={isScrolled}
      />
      {bookmarksView}
    </>
  );
}

export default MainView;

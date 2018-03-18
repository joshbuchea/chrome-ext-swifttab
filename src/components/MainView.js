import React from 'react';
import PropTypes from 'prop-types';
import AppToolbar from './AppToolbar';
import BookmarksView from './BookmarksView';

class MainView extends React.Component {
  static propTypes = {
    bookmarks: PropTypes.array,
  };

  static defaultProps = {
    bookmarks: [],
  };

  state = {
    isScrolled: false,
    search: '',
  };

  handleSearchChange = e =>
    this.setState({ search: e.target.value.toLowerCase() });

  handleScrollChange = e => {
    const isScrolled = e.target.scrollTop > 0 ? true : false;
    isScrolled !== this.state.isScrolled && this.setState({ isScrolled });
  };

  filterBookmarks(bookmarks, filter) {
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

  render() {
    const bookmarksFiltered = this.filterBookmarks(
      this.props.bookmarks,
      this.state.search
    );

    const msg = this.state.search ? (
      <div class="no-bookmarks">No search results found</div>
    ) : (
      <div class="no-bookmarks fadein">
        Bookmarks in <strong>Bookmarks Bar</strong> or{' '}
        <strong>{this.props.folder}</strong> appear here
      </div>
    );

    const bookmarksView = !bookmarksFiltered.length ? (
      msg
    ) : (
      <BookmarksView
        handleScrollChange={this.handleScrollChange}
        data={bookmarksFiltered}
      />
    );

    return (
      <React.Fragment>
        <AppToolbar
          handleSearchChange={this.handleSearchChange}
          searchValue={this.state.search}
          shadow={this.state.isScrolled}
        />
        {bookmarksView}
      </React.Fragment>
    );
  }
}

export default MainView;

import React from 'react';
import Masonry from 'react-masonry-component';

const masonryOptions = {
  // fitWidth: true,
  stagger: 30,
  transitionDuration: 200,
};

function getImageString(url) {
  return `-webkit-image-set(
    url('chrome://favicon/size/16@1x/${url}') 1x,
    url('chrome://favicon/size/16@2x/${url}') 2x
  )`;
}

function BookmarksView(props) {
  const bookmarks = props.data;

  return (
    <div className="bookmarks-view" onScroll={props.handleScrollChange}>
      <Masonry className={"bookmarks"} options={masonryOptions}>
        {bookmarks.map(folder => (
          <div class="tile">
            <div class="card">
              <div class="card-title">{folder.title}</div>
              <ul class="bookmark-list">
                {folder.children
                  .filter(bookmark => bookmark.url)
                  .map(bookmark => (
                    <li>
                      <a
                        href={bookmark.url}
                        title={bookmark.title}
                        style={{
                          backgroundImage: getImageString(bookmark.url)
                        }}
                      >
                        {bookmark.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
}

export default BookmarksView;

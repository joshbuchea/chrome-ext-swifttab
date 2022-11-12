import React from 'react';
import Masonry from 'react-masonry-component';

const masonryOptions = {
  // fitWidth: true,
  stagger: 30,
  transitionDuration: 200,
};

function getImageString(url) {
  // chrome-extension://<id>/_favicon/?pageUrl=https://example.com&size=24
  // Uncomment the code below when it's time to upgrade to extension manifest v3
  // return `-webkit-image-set(
  //   url('chrome-extension://${
  //     chrome.runtime.id
  //   }/_favicon/?pageUrl=${encodeURIComponent(url)}&size=16') 1x,
  //   url('chrome-extension://${
  //     chrome.runtime.id
  //   }/_favicon/?pageUrl=${encodeURIComponent(url)}&size=32') 2x
  // )`;

  return `-webkit-image-set(
    url('chrome://favicon/size/16@1x/${url}') 1x,
    url('chrome://favicon/size/16@2x/${url}') 2x
  )`;
}

function BookmarksView(props) {
  const { data: bookmarks, handleScrollChange } = props;

  return (
    <div className="bookmarks-view" onScroll={handleScrollChange}>
      <Masonry className="bookmarks" options={masonryOptions}>
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
                          backgroundImage: getImageString(bookmark.url),
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

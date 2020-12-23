# SwiftTab

Chrome extension that enables a personal new tab page featuring links from your Bookmarks Bar

[![Chrome Web Store Version](https://img.shields.io/chrome-web-store/v/poikmgendcdljfoaelblkdjehmpedjif.svg?style=flat-square)](https://chrome.google.com/webstore/detail/swifttab/poikmgendcdljfoaelblkdjehmpedjif)
[![Chrome Web Store Downloads](https://img.shields.io/chrome-web-store/d/poikmgendcdljfoaelblkdjehmpedjif.svg?style=flat-square)](https://chrome.google.com/webstore/detail/swifttab/poikmgendcdljfoaelblkdjehmpedjif)
[![Chrome Web Store Rating](https://img.shields.io/chrome-web-store/rating/poikmgendcdljfoaelblkdjehmpedjif.svg?style=flat-square)](https://chrome.google.com/webstore/detail/swifttab/poikmgendcdljfoaelblkdjehmpedjif)
[![Chrome Web Store Rating Count](https://img.shields.io/chrome-web-store/rating-count/poikmgendcdljfoaelblkdjehmpedjif.svg?style=flat-square)](https://chrome.google.com/webstore/detail/swifttab/poikmgendcdljfoaelblkdjehmpedjif/reviews) [![License](https://img.shields.io/github/license/joshbuchea/chrome-ext-swifttab.svg?style=flat-square)](LICENSE) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

**[Available on the Chrome Web Store](https://chrome.google.com/webstore/detail/swifttab/poikmgendcdljfoaelblkdjehmpedjif)**

## Screenshot

<img src="resources/screenshot1-1280x800.png" width="100%" height="auto">

## Manual Install

* Clone or download this repo
* Install Dependencies: `yarn` or `npm install`
* Build Extension: `npm run build`
* Load Extension:
  * Launch Chrome
  * Browse to `chrome://extensions`
  * Check "Developer mode" if it isn't already checked
  * Press "Load unpacked extension..."
  * Select the `chrome-ext-swifttab/build` folder

## To Do

* [ ] Re-architect
  * [ ] Remove build step?
    * I learned that babel standalone won't work inside a chrome extension (new tab)
  * [ ] Create BookmarksProvider
* [ ] Define PropTypes
* [ ] Remove inline styles (AppToolbar, ?)
* [ ] Refactor (Reconsider component hierarchy?)

## License

[MIT](LICENSE)

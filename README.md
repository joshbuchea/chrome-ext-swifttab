# SwiftTab

<p>
  <img src="resources/icon-700.png" width="320px" height="auto">
</p>

---

Chrome extension that enables a personal new tab page featuring links from your Bookmarks Bar

![](https://img.shields.io/badge/Version-0.1.0-blue.svg?style=flat) [![License](https://img.shields.io/github/license/joshbuchea/chrome-ext-swifttab.svg)](LICENSE) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Screenshot

<img src="resources/screenshot1-1280x800.png" width="100%" height="auto">

## Install

### Chrome Web Store

[Add to Chrome](https://chrome.google.com/webstore/detail/swifttab/poikmgendcdljfoaelblkdehmpedjif)

### Manual Install

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

* [ ] Define PropTypes
* [ ] Replace ToolbarIconButton with if equiv RMWC Component exists
* [ ] Remove inline styles (AppToolbar, ?)
* [ ] Refactor (Reconsider component hierarchy?)

## License

[MIT](LICENSE)

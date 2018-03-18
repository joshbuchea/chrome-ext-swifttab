# SwiftTab

<p>
  <img src="resources/icon-700.png" width="320px" height="auto">
</p>

---

A new tab extension for Chrome.

[![License](https://img.shields.io/github/license/joshbuchea/chrome-ext-swifttab.svg)](LICENSE) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## To Do

* [ ] Add PropTypes
* [ ] Remove ToolbarIconButton if way to use already built components
* [ ] Remove inline styles (AppToolbar, ..?)
* [ ] Refactor? - Reconsider component hierarchy?

## Install

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

## Add Bookmarks

* The extension looks for a bookmarks folder named `_Swift`. The extension loads sub-folders and their contents from this folder. All other folders & bookmarks are ignored.

## Screenshot

<img src="resources/screenshot1-1280x800.png" width="100%" height="auto">

## License

[MIT](LICENSE)

# @livelybone/vue-pagination
[![NPM Version](http://img.shields.io/npm/v/@livelybone/vue-pagination.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/vue-pagination)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/vue-pagination.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/vue-pagination)
![gzip with dependencies: 1.5kb](https://img.shields.io/badge/gzip--with--dependencies-1.5kb-brightgreen.svg "gzip with dependencies: 1.5kb")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

A vue pagination component

## repository
https://github.com/livelybone/vue-pagination.git

## Demo
https://livelybone.github.io/vue/vue-pagination/

## Installation
```bash
npm i -S @livelybone/vue-pagination
```

## Global name
`Pagination`

## Usage
```js
// import all
import Pagination from '@livelybone/vue-pagination';

// Global register
Vue.component('pagination', Pagination);

// Local register
new Vue({
  components:{Pagination}
})
```

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/@livelybone/vue-pagination/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/@livelybone/vue-pagination/lib/umd/<--module-->.js"></script>
```

## Props

### Common
| Name                      | Type                                      | DefaultValue                                  | Description  |
| ------------------------- | ----------------------------------------- | --------------------------------------------- | ------------ |
| `noPage`                  | `Boolean`                                 | `false`                                       | If you don't know the count of total pages, you should set this to `true` |
| `config`                  | `Object`                                  | `defaultConfig`&brvbar;`noPageConfig`         | If `noPage` is false, the defaultValue is `defaultConfig`, otherwise, the defaultValue is `noPageConfig` |
| `input`                   | `Object`                                  | `inputConfig`                                 | The input config |
| `turnBtns`                | `Object`                                  | `turnBtns`                                    | The prev-or-next button text config |

```js
/**
 * @attr {Number} pages, the count of total pages
 * @attr {Number} page, the index of current page 
 * @attr {Number} pageSize, the size of per page 
 * @attr {Number} maxPageBtn, the max number of page buttons 
 * */
const defaultConfig = {
  pages: 1,
  page: 1,
  pageSize: 10,
  maxPageBtn: 7,
}

/**
 * @attr {Number} page, the index of current page 
 * @attr {Number} pageSize, the size of per page 
 * @attr {Number} currentPageSize, the size of current page 
 * */
const noPageConfig = {
  page: 1,
  pageSize: 10,
  currPageSize: 10,
}

/**
 * @attr {Boolean} enable, if use input tag or not 
 * @attr {String} text, the label text of input tag
 * @attr {Number} debonceTime, the debonce time to trigger event `to`
 * */
const inputConfig = {
  enable: true,
  text: 'Go to',
  debonceTime: 500,
}

/**
 * @attr {String} prev, the text of prev button
 * @attr {String} next, the text of next button
 * */
const turnBtns = {
  prev: '<',
  next: '>',
}
```

## Events
| Name              | EmittedData           | Description                                       |
| ----------------- | --------------------- | ------------------------------------------------- |
| `to`              | `Number`              |  |

## style
For building style, you can use the css or scss file in lib directory.
```js
// scss
import 'node_modules/@livelybone/vue-pagination/lib/css/index.scss'

// css
import 'node_modules/@livelybone/vue-pagination/lib/css/index.css'
```
Or
```scss
// scss
@import 'node_modules/@livelybone/vue-pagination/lib/css/index.scss';

// css
@import 'node_modules/@livelybone/vue-pagination/lib/css/index.css';
```

Or, you can build your custom style by copying and editing `index.scss`

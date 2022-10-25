# quill-color-picker-enhance

[![npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/quill-color-picker-enhance.svg?style=flat-square&logo=npm
[npm-url]: https://www.npmjs.com/package/quill-color-picker-enhance

## Features

- custom color picker

  <img src="https://user-images.githubusercontent.com/5278201/198178344-e2c00380-5bb0-408e-a661-6744045585c3.png" width="200px">

- Improved color picker labels to make it easier to see the currently selected color

  |                                                            before                                                             |                                                             after                                                             |
  | :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: |
  | <img src="https://user-images.githubusercontent.com/5278201/198178365-c2e6ca61-86d6-47c6-8734-98624c74f726.png" width="70px"> | <img src="https://user-images.githubusercontent.com/5278201/198178351-72857e25-7209-45b8-b18d-7ea80e4d0aef.png" width="70px"> |

## How to setup

### SnowTheme

```js
import Quill from 'quill';

import { SnowTheme } from 'quill-color-picker-enhance';
import 'quill-color-picker-enhance/dist/index.css';

Quill.register('themes/snow-quill-color-picker-enhance', SnowTheme);

const quill = new Quill('#editor-container', {
  modules: {
    toolbar: [{ color: [] }, { background: [] }]
  },
  theme: 'snow-quill-color-picker-enhance'
});
```

### Bubble Theme

TODO

### Script Tag

Copy `dist/index.min.js` into your web root or include from `node_modules`

```html
<script src="/node_modules/quill-color-picker-enhance/index.min.js"></script>
```

```javascript
Quill.register('themes/snow-quill-color-picker-enhance', QuillColorPickerEnhance.SnowTheme);
```

Please use the theme `snow-quill-color-picker-enhance`.

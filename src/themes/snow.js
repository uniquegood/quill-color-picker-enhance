import Quill from 'quill';
import ColorPicker from '../ui/color-picker';
import extend from 'extend';

const Theme = Quill.import('themes/snow');

const Picker = Quill.import('ui/picker');
const IconPicker = Quill.import('ui/icon-picker');

const ALIGNS = [false, 'center', 'right', 'justify'];

const COLORS = [
  '#000000',
  '#e60000',
  '#ff9900',
  '#ffff00',
  '#008a00',
  '#0066cc',
  '#9933ff',
  '#ffffff',
  '#facccc',
  '#ffebcc',
  '#ffffcc',
  '#cce8cc',
  '#cce0f5',
  '#ebd6ff',
  '#bbbbbb',
  '#f06666',
  '#ffc266',
  '#ffff66',
  '#66b966',
  '#66a3e0',
  '#c285ff',
  '#888888',
  '#a10000',
  '#b26b00',
  '#b2b200',
  '#006100',
  '#0047b2',
  '#6b24b2',
  '#444444',
  '#5c0000',
  '#663d00',
  '#666600',
  '#003700',
  '#002966',
  '#3d1466',
  'custom-picker'
];

const FONTS = [false, 'serif', 'monospace'];

const HEADERS = ['1', '2', '3', false];

const SIZES = ['small', false, 'large', 'huge'];

export default class SnowTheme extends Theme {
  buildPickers(selects, icons) {
    this.pickers = selects.map((select) => {
      if (select.classList.contains('ql-align')) {
        if (select.querySelector('option') == null) {
          fillSelect(select, ALIGNS);
        }
        return new IconPicker(select, icons.align);
      }
      if (select.classList.contains('ql-background') || select.classList.contains('ql-color')) {
        const format = select.classList.contains('ql-background') ? 'background' : 'color';
        if (select.querySelector('option') == null) {
          fillSelect(select, COLORS, format === 'background' ? '#ffffff' : '#000000');
        }
        // THIS POINT IS DIFFERENT - 'format' third argument appended
        return new ColorPicker(select, icons[format], this.quill, format);
      }
      if (select.querySelector('option') == null) {
        if (select.classList.contains('ql-font')) {
          fillSelect(select, FONTS);
        } else if (select.classList.contains('ql-header')) {
          fillSelect(select, HEADERS);
        } else if (select.classList.contains('ql-size')) {
          fillSelect(select, SIZES);
        }
      }
      return new Picker(select);
    });
    const update = () => {
      this.pickers.forEach(function (picker) {
        picker.update();
      });
    };
    this.quill.on('editor-change', update);
  }
}

SnowTheme.DEFAULTS = extend(true, {}, Theme.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        color: pickerHandler('color'),
        background: pickerHandler('background')
      }
    }
  }
});

function fillSelect(select, values, defaultValue = false) {
  values.forEach((value) => {
    const option = document.createElement('option');
    if (value === defaultValue) {
      option.setAttribute('selected', 'selected');
    } else {
      option.setAttribute('value', value);
    }
    select.appendChild(option);
  });
}

function pickerHandler(format) {
  return function (value) {
    if (value === 'custom-picker') {
      const _picker = this.container.querySelector(`.custom-picker.${format}`);

      const picker =
        _picker ||
        (() => {
          const picker = document.createElement('input');
          picker.type = 'color';
          picker.hidden = true;
          picker.classList.add('custom-picker', format);
          this.container.appendChild(picker);
          return picker;
        })();

      picker.addEventListener('change', () => {
        this.quill.format(format, picker.value);
      });
      picker.click();
    } else {
      this.quill.format(format, value);
    }
  };
}

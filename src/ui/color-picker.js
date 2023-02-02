import Quill from 'quill';
import icons from './icons';

const Picker = Quill.import('ui/color-picker');

export default class ColorPicker extends Picker {
  constructor(select, label, quill, format) {
    super(select);
    this.quill = quill;
    this.format = format;
    this.label.innerHTML = label;
    this.container.classList.add('ql-color-picker');
    [].slice
      .call(this.container.querySelectorAll('.ql-picker-item', 0, 7))
      .forEach(function (item) {
        item.classList.add('ql-primary');
      });
  }
  buildItem(option) {
    let item = super.buildItem(option);
    let value = option.getAttribute('value');

    if (value === null) {
      item.style.backgroundImage = `url('data:image/svg+xml;utf8,${icons.color.cancel.replace(
        /[\t\n]/g,
        ''
      )}')`;
      item.style.backgroundSize = 'cover';
      item.title = '색상 지우기';
    } else {
      item.title = value;
    }
    return item;
  }

  selectItem(item, trigger) {
    super.selectItem(item, trigger);

    const svgShapes = this.label.querySelectorAll('.ql-stroke');
    const value =
      (item && item.getAttribute('data-value')) ||
      (() => {
        if (this.quill) {
          const range = this.quill.getSelection();
          const formats = range ? this.quill.getFormat(range) : {};

          const { color, background } = formats;

          if (this.format === 'color') return color;
          return background;
        }
      })();

    if (this.format === 'background') {
      this.label.querySelector('svg').style.backgroundColor = value || 'initial';
    }

    if (!value) {
      for (const svgShape of svgShapes) {
        if (svgShape) {
          svgShape.style = {};
        }
      }
      return;
    }

    const calculateStrokeColor = {
      color: () => value,
      background: () => {
        const [r, g, b] = hexToRgb(value);
        const isCloseToBrightColor = (r + g + b) / 3 > 127;

        return isCloseToBrightColor ? '#000' : '#fff';
      }
    };

    for (const svgShape of svgShapes) {
      if (svgShape) {
        svgShape.style.stroke = calculateStrokeColor[this.format]();
      }
    }
  }
}

function hexToRgb(hex) {
  return hex
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => `#${r + r + g + g + b + b}`)
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));
}

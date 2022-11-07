/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import Tooltip from './Tooltip';

export default class Validator {
  constructor() {
    this.tooltips = [];

    this.check = this.check.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  static errors = {
    name: {
      valueMissing: 'Укажите наименование товара',
    },
    price: {
      valueMissing: 'Укажите стоимость товара',
      typeMismatch: 'Значение должно содержать только цифры',
      rangeUnderflow: 'Допустимое значение 1 и более',
    },
  };

  static getError(elem) {
    const errorKey = Object.keys(ValidityState.prototype).find((key) => {
      if (key === 'valid') return;
      if (elem.validity[key]) {
        return key;
      }
    });
    if (!errorKey) return;

    return Validator.errors[elem.name][errorKey];
  }

  onCheck(e) {
    this.check(e.target);
  }

  check(elem) {
    this.tooltips.forEach((t, idx, arr) => {
      if (t.relatedEl === elem) {
        t.remove();
        arr.splice(idx, 1);
      }
    });

    const errorText = Validator.getError(elem);

    if (errorText) {
      const tooltip = new Tooltip(elem, errorText);
      tooltip.show();
      this.tooltips.push(tooltip);
    }
  }
}

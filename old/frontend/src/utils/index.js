class Utils {
  static validateEmptyFields(fields, data) {
    for (let ind = 0; ind < fields.length; ind += 1) {
      let value = fields[ind].split('.').reduce((o, i) => o[i], data);
      value = typeof value === 'string' ? value.trim() : value;
      if (this.isEmpty(value, false)) {
        return true;
      }
    }
    return false;
  }

  static validateFieldErrors(errors) {
    return Object.keys(errors).find((key) => errors[key].error);
  }

  static isEmpty(value, isObj) {
    const trimmedValue = typeof value === 'string' ? value.trim() : value;
    if (typeof trimmedValue === 'number') {
      return false;
    }
    if (!trimmedValue) {
      return true;
    }
    if (isObj) {
      return this.isEmptyObject(trimmedValue);
    }
    return false;
  }

  static isEmptyObject(value) {
    if (Array.isArray(value)) {
      if (value.length === 0) return true;
    } else if (Object.keys(value).length === 0) return true;
    return false;
  }
}
export default Utils;

const utils = {
  compare(property) {
    return function (obj1, obj2) {
      let value1 = obj1[property];
      let value2 = obj2[property];
      return value1 - value2;     // 升序
    }
  }
}
export default utils

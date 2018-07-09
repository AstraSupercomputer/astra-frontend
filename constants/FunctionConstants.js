function debounce(fn, delay) {
  var timer = null;
  return () => {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  }
};

export default {
  DEBOUNCE: debounce,
};
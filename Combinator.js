var Combinator = function(opts) {
  var combinations = [];
  function combine(current, remainder) {
      if (remainder.length == 0) {
        if (current.length >= (opts.min||0) &&
            current.length <= (opts.max||current.length))
          combinations.push(current);
      } else {
          combine(current.concat(remainder[0]), remainder.slice(1, remainder.length));
          combine(current, remainder.slice(1, remainder.length));
      }
      return this;
  }
  return {
    combinations: combinations,
    combine: combine
  }
}

module.exports = Combinator;

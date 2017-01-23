var CombinatorGenerator = function (opts) {
    function* combine(current, remainder) {
        if (remainder.length === 0) {
            if (current.length >= (opts.min || 0) &&
                current.length <= (opts.max || current.length)) {
                yield(current);
            }
        } else {
            yield* combine(current.concat(remainder[0]), remainder.slice(1, remainder.length))
            yield* combine(current, remainder.slice(1, remainder.length))
        }
    }
    return {
        combine: combine
    }
}

module.exports = CombinatorGenerator;

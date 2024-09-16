const { ref } = require("./utils.js");

module.exports = {
  convert: function(bridge, input, stopError) {
    return ref.multi.convert(input, bridge, stopError);
  }
}

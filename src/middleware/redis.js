const redis = require("redis")

client.get("missing_key", function(err, reply) {
    // reply is null when the key is missing
    console.log(reply);
  });

exports.module = redis
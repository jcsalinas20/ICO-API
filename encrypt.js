module.exports = {
    encrypt: function(pass) {
        var crypto = require("crypto")
        return crypto
            .createHash("md5")
            .update(pass)
            .digest("hex")
    }
}

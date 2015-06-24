/**
 * 500 (Server Error) Response
 *
 * Usage:
 * return res.serverError();
 * return res.serverError(dataResponse);
 * return res.serverError(dataResponse, logMessage);
 *
 * NOTE:
 * If something throws in a policy or controller, or an internal
 * error is encountered, Sails will call `res.serverError()`
 * automatically.
 */
var util = require('util');

module.exports = function serverError (data, err) {

    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;
    var d = new Date();
    var response = util.format('[%s] - %s %s %d - ', d.toLocaleString(), req.method, req.url, 500);

    // Set status code
    res.status(500);

    // Log error to console
    if (err !== undefined) {
      Logger.error(response, err);
    }
    else Logger.error(response);

    res.json(data);
};


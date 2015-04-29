/**
 * 403 (Forbidden) Handler
 *
 * Usage:
 * return res.forbidden();
 * return res.forbidden(dataResponse);
 * return res.forbidden(dataResponse, logMessage);
 *
 * e.g.:
 * ```
 * return res.forbidden('Access denied.');
 * ```
 */
var util = require('util');

module.exports = function forbidden (data, err) {

    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;
    var d = new Date();
    var response = util.format('[%s] %s %s - %s %s %d - ', d.toLocaleString(), req.options.controller, req.options.action, req.method, req.url, 403);

    // Set status code
    res.status(403);

    // Log error to console
    if (err !== undefined) {
      Logger.error(response, err);
    }
    else Logger.error(response);

    res.json(data);
};


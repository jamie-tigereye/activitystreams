/**
 * 404 (Not Found) Handler
 *
 * Usage:
 * return res.notFound();
 * return res.notFound(dataResponse);
 * return res.notFound(dataResponse, logMessage);
 *
 * e.g.:
 * ```
 * return res.notFound();
 * ```
 *
 * NOTE:
 * If a request doesn't match any explicit routes (i.e. `config/routes.js`)
 * or route blueprints (i.e. "shadow routes", Sails will call `res.notFound()`
 * automatically.
 */
var util = require('util');

module.exports = function notFound (data, err) {

    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;
    var d = new Date();
    var response = util.format('[%s] - %s %s %d - ', d.toLocaleString(), req.method, req.url, 404)

    // Set status code
    res.status(404);

    // Log error to console
    if (err !== undefined) {
      Logger.error(response, err);
    }
    else Logger.error(response);

    res.json(data);
};


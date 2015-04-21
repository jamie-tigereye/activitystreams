/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(dataResponse);
 * return res.badRequest(dataResponse, logMessage);
 *
 * e.g.:
 * ```
 * return res.badRequest(
 *   'Bad Request',
 *   'Authentication policy: userId is null'
 * );
 * ```
 */

module.exports = function badRequest(data, err) {

    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;

    // Set status code
    res.status(400);

    // Log error to console
    if (err !== undefined) {
      Logger.error('Sending 400 ("Bad Request") response: \n',JSON.stringify(err));
    }
    else Logger.error('Sending 400 ("Bad Request") response');

    res.json(data);
};


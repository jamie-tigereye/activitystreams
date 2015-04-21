/**
 * 401 (Not Authorized) Handler
 *
 * Usage:
 * return res.notAuthorized();
 * return res.notAuthorized(dataResponse);
 * return res.notAuthorized(dataResponse, logMessage);
 *
 * e.g.:
 * ```
 * return res.notAuthorized();
 * ```
 */

module.exports = function notAuthorized (data, err) {

    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;

    // Set status code
    res.status(401);

    // Log error to console
    if (err !== undefined) {
      Logger.error('Sending 401 ("Not Authorized") response: \n', JSON.stringify(err));
    }
    else Logger.error('Sending 401 ("Not Authorized") response');

    res.json(data);
};


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

module.exports = function forbidden (data, err) {

    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;

    // Set status code
    res.status(403);

    // Log error to console
    if (err !== undefined) {
      Logger.log('Sending 403 ("Forbidden") response: \n', JSON.stringify(err));
    }
    else Logger.log('Sending 403 ("Forbidden") response');

    res.json(data);
};


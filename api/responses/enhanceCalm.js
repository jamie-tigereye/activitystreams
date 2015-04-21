 /*
 * 420 (Enhance your calm) Handler
 *
 * Usage:
 * return res.enhanceCalm();
 * return res.enhanceCalm(dataResponse);
 * return res.enhanceCalm(dataResponse, logMessage);
 *
 * e.g.:
 * ```
 * return res.enhanceCalm();
 */

module.exports = function enhanceCalm (data, err) {

    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;

    // Set status code
    res.status(420);

    // Log error to console
    if (err !== undefined) {
      Logger.error('Sending 420 ("Enhance your calm") response: \n', JSON.stringify(err));
    }
    else Logger.error('Sending 420 ("Enhance your calm") response');

    res.json(data);
};

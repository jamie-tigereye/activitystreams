/**
 * ObjectController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to ObjectController)
     */
    _config: {},

    /**
     * Action blueprints:
     *    `/object/getAllObjectOfType`
     */
    getAllObjectsOfType: function(req, res) {
        var q = [
            'MATCH(object:' + req.param('object') + ')',
            'RETURN object'
        ];

        Activity.query(q, {}, function(err, results) {
            if (err) {
                return res.serverError({ error: 'INVALID REQUEST' }, err);
            }

            results = Pagination(req.query, results);
            res.ok(results);
            return Caching.write(req, results, 5);
        });
    },

    /**
     * Action blueprints:
     *    `/object/getSpecificObject`
     */
    getSpecificObject: function(req, res) {
        var obj = {}, q;
        q = [
            'MATCH(object:' + req.param('object') + ')',
            'WHERE object.aid="' + req.param('object_id') + '"',
            'RETURN object'
        ];

        Activity.query(q, {}, function(err, results) {
            if (err) {
                return res.serverError({ error: 'INVALID REQUEST' }, err);
            }

            res.ok(results);
            return Caching.write(req, results, 4);
        });
    },

    /**
     * Delete Specific Object from graph
     * @param  {String} appname_model [The type of object you want to delete]
     * @param  {String} id [The id of the object you want to delete]
     * @return {HTML} 200, 500 [200 OK if the deletion worked, and 500 if there was an error]
     */
    deleteSpecificObject: function(req, res) {
        var obj = {}, q;
        q = [
            'MATCH (object:' + req.param('object') + ')-[v]-()',
            'WHERE object.aid="' + req.param('object_id') + '"',
            'DELETE object, v'
        ];

        Activity.query(q, {}, function(err, results) {
            if (err) {
                return res.serverError({ error: 'INVALID REQUEST' }, err);
            }

            res.ok(results);
            return Caching.bust(req, []);
        });
    },

    /**
     * Delete Specific Object verbed by actor from graph
     * @param  {String} actor [The actor of the object you want to delete]
     * @param  {String} actor_id [The id of the actor of the object you want to delete]
     * @param  {String} object [The type of object you want to delete]
     * @param  {String} object_id [The id of the object you want to delete]
     * @param  {String} verb [The verb is the name of a valid activity type]
     * @return {HTML} 200, 404, 500 [200 OK if the deletion worked, 404 object is not found, and 500 if there was an error]
     */
    deleteSpecificObjectVerbedByActor: function(req, res) {
        var obj = {}, q;
        q = [
            'MATCH (a:' + req.param('actor') + ')-[v:' + req.param('verb') + ']->(o:' + req.param('object') + ')',
            'WHERE a.aid="' + req.param('actor_id') +'" AND o.aid="' + req.param('object_id') + '"',
            'WITH a, v, o',
            'MATCH (actor)-[r]->(object)',
            'WHERE (actor.type = a.type AND object.type = o.type AND object.aid = o.aid) ',
            'OR (HAS(r.target_id) AND r.target_id = o.aid AND r.target_type = o.type)',
            'DELETE r,object',
            'RETURN count(actor) as affected_actors'
        ];

        Activity.query(q, {}, function(err, results) {
            if (err) {
                return res.serverError({ error: 'INVALID REQUEST' }, err);
            }
            if (typeof results[0]["affected_actors"] === 'object') {
                return res.notFound({error: 'NOT FOUND'}, 'Object not found');
            }
            results = Caching._generateDataFromReq(req);
            res.ok(results);
             /** Delete actor and verb for cache busting. */
            delete results[0].actor;
            delete results[0].verb;
            return Caching.bust(req, results);
        });
    },

    /**
     * Action blueprints:
     *    `/object/getAllActivitiesByObject`
     */
    getAllActivitiesByObject: function(req, res) {
        var obj = {}, q;
        q = [
            'MATCH (object:' + req.param('object') + ')<-[verb]-(actor)',
            'WHERE object.aid="' + req.param('object_id') + '"',
            'WITH type(verb) as verbType, count(actor) as actors, { actor: actor, verb: verb, object: object } as activity',
            'RETURN verbType as verb, count(actors) as totalItems, collect(activity) as items'
        ];

        Activity.query(q, {}, function(err, results) {
            if (err) {
                return res.serverError({ error: 'INVALID REQUEST' }, err);
            }

            results.forEach(function(result) {
                if (result.hasOwnProperty('items')) {
                    result.items = Pagination(req.query, result.items);
                }
            });

            res.ok(results);
            return Caching.write(req, results, 4);
        });
    },


    /**
     * Action blueprints:
     *    `/object/getAllActorsWhoVerbedObject`
     */
    getAllActorsWhoVerbedObject: function(req, res) {
        var obj = {}, q;
        q = [
            'MATCH (object:' + req.param('object') + ')<-[verb:' + req.param('verb') + ']-(actor)',
            'WHERE object.aid="' + req.param('object_id') + '"',
            'WITH count(actor) as actors, { actor: actor, verb: verb, object: object } as activity',
            'RETURN count(actors) as totalItems, collect(activity) as items'
        ];

        Activity.query(q, {}, function(err, results) {
            if (err) {
                return res.serverError({ error: 'INVALID REQUEST' }, err);
            }

            if (results.length && results[0].hasOwnProperty('items')) {
                results[0].items = Pagination(req.query, results[0].items);
            }

            res.ok(results);
            return Caching.write(req, results, 3);
        });
    },


    /**
     * Action blueprints:
     *    `/object/getSpecificActorTypeWhoVerbedObject`
     */
    getSpecificActorTypeWhoVerbedObject: function(req, res) {
        var obj = {}, q;
        q = [
            'MATCH (object:' + req.param('object') + ')<-[verb:' + req.param('verb') + ']-(actor:' + req.param('actor') + ')',
            'WHERE object.aid="' + req.param('object_id') + '"',
            'WITH count(actor) as actors, { actor: actor, verb: verb, object: object } as activity',
            'RETURN count(actors) as totalItems, collect(activity) as items'
        ];

        Activity.query(q, {}, function(err, results) {
            if (err) {
                return res.serverError({ error: 'INVALID REQUEST' }, err);
            }

            if (results.length && results[0].hasOwnProperty('items')) {
                results[0].items = Pagination(req.query, results[0].items);
            }

            res.ok(results);
            return Caching.write(req, results, 2);
        });
    }
};

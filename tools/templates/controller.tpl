/**
 * @module {{resource.name}} controller
 *
 * @description
 * The controller layer. Instead of directly writing any
 * business logics here, please use service(s).
 *
 * The basic controller is written as CRUD controller, but
 * you can write it any way to support your api endpoint.
 * For example, for a checkout API, the CRUD will not make
 * sense but a `checkout` function will.
 */

/**
 * Either get one resource or multiple, depending on the
 * identifiers provided in the params- as well as how you
 * implement the function.
 *
 * @example
 * Sample `params`-
 * {id: 'GH12BHS'} - should return single resource
 * {country: 'US', region: 'NYC'} - can return multiple
 * matching resources
 *
 * @param {*} params
 */
function get(params) {}

/**
 * Should be the entrypoint to persist a resource from a
 * POST/PATCH/PUT request payload. You can either use this
 * as `createOrUpdate` gateway or can implement separate
 * methods for `create` and `update` actions.
 *
 * @param {*} payload
 */
function save(payload) {}

/**
 * Remove one or multiple resources obtainable via some
 * identifiers given as params.
 *
 * @example
 * Params can be an object like-
 * {id: '12134EDS'} - single resource remove
 * {age: 12} - multiple resource remove; if multiple
 * resources with age = 12 exists
 *
 * @param {*} params
 */
function remove(params) {}

module.exports = {
  get,
  save,
  remove,
};

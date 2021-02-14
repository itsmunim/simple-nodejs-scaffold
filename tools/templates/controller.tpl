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

class Controller {
  static async get() {}
  static async remove() {}
  static async save() {}
}

module.exports = Controller;

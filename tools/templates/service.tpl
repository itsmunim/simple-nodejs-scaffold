/**
 * @module {{resource.name}} service
 *
 * @description
 * This is where you should use the repositories for different models
 * and add your business logics to support controller demand.
 * The data transfer should always be-
 *
 * controller -> [request/domain object] -> service
 * service -> [model/db object] -> repository
 * repository -> [model/db object] -> service
 * service -> [response/domain object] -> controller
 * 
 * Service should always use repositories to get, save, delete persistence
 * objects. It should never directly communicate with database.
 * 
 * If you have multiple services, consider adding them inside a folder called
 * `services` and give every file respective names.
 * 
 * Example:
 * 
 * For a checkout API, the services folder may look like-
 * 
 * services/
 *  - checkout.service.js
 *  - payment.service.js
 *  - notification.service.js
 */

class Service {
}

module.exports = Service;
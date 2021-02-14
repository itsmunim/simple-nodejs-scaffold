/**
 * @module {{resource.name}} repository
 * 
 * @description
 * This is the layer that works as the gateway to communicate
 * to and from db. This layer takes care of retrieving and saving
 * persistent objects. Keeping this separate allows you to keep
 * db integration tied to one layer, while keeping the upper
 * layer(e.g. service) contract intact. Hence, replacing with a
 * new persistence option integration is easy and quick. This is
 * where you put your ORM codes to access your models.
 * 
 * A single repository can handle db communications for all the
 * models. That is absolutely fine. But if you want to have separate
 * repositories for each models, that's also possible. But make sure
 * to avoid repeting codes, you define a core repository, that is
 * used by all others.
 */

class Repository {
}

module.exports = Repository;
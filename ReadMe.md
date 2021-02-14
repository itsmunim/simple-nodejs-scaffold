<div align="center">
  <h1>
    🦥 Simple NodeJS Scaffold 🦥
  </h1>
</div>

<p align="center">
  Simple enough service scaffolding in node and express; to get you started on your project immediately- with right folder structure and architecture practices in place 🤟🏼
</p>



## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Serving Frontend](#serving-frontend)
- [Folder Structure](#folder-structure)
- [Adding new API Resource](#adding-new-api-resource)
- [Others](#others)



## Features

- Don't worry about the boilerplate anymore, jump right into writing your API
resources

- Easily start serving your frontend; great option to create a BFF right away

- Have error handling and graceful shutdown support out of the box

- Structure your code in a domain driven approach- with right architectural practices in place

- Has `mongo` connectivity built-in, simply define schemas and start writing stateful APIs

- Dockerized
## Usage

### Without Docker

- `npm install`

- If you need `mongo` connectivity, run `mongo` in local and create an `.env` file with following content:
    ```
    MONGO_USERNAME=local-mongo-user-name
    MONGO_PASSWORD=local-mongo-user-pword
    MONGO_PORT=27017
    MONGO_DB=mongo-db-name
    ```

- Then, this will start the server in port `8282`: `npm start`

- To run in different port: `PORT=8000 npm start`

### With Docker

- Make sure you have created an `.env` file stated above

- This will run the service at `8282` port with `mongo` connectivity by default:

    `docker-compose build && docker-compose up -d`

- To check logs: `docker-compose logs`

- To shutdown: `docker-compose down`

## Serving Frontend 

### Without Docker

If your frontend dir has following structure
  ``` 
  client/
  | - index.html
  | - resources/ <-- or may be static/ or dist/
  ```

Then, this can easily be served using-
  ```
  CLIENT_DIR=<absolute path of your client dir> npm start
  ```

If your `index.html` file is at one place and folder with static files in another, then the following might be your option-
  ```
  INDEX=<absolute path of index.html> STATIC_DIR=<absolute path of static folder> npm start
  ```
### With Docker

In the `.env` file add following value to serve from a client app:
  ```
  CLIENT_DIR=<absolute path of your client dir>
  ```
  
Or, to serve index and static files separately like stated in `Without Docker` section:
  ```
  INDEX=<absolute path of index.html>
  STATIC_DIR=<absolute path of static folder>
  ```
## Folder Structure

At the root of this directory, the `index.js` works as the entrypoint for this service. It hooks up with certain modules under `server` dir and makes the service up and running when you hit- `npm start`.

This is how the `server` dir is structured at this moment:

``` 
.
├── api (all the api resources are here)
│   ├── user
│   │   ├── test
│   │   │   └── controller.test.js
│   │   ├── config.js
│   │   ├── controller.js
│   │   ├── index.js
│   │   └── route.js
│   └── index.js
├── core (all the core functionalities of the service is bundled here)
│   ├── bootstrapper.js
│   ├── commonErrorHandler.js
│   ├── logger.js
│   └── shutdownManager.js
├── testHelpers (test specific helpers, global vars should be here)
│   └── globals.js
├── utils (any utils or common helpers should be here)
│   └── error.js
└── index.js    
```
## Adding new API resource

### CLI

Using the new cli tool bundled in this scaffold, adding a new api resource can be as easy as doing- 

`npm run add-resource <resource-name-in-kebabcase>`

Example- `npm run add-resource order-items`

Please read the comments generated with the files to better understand the architecture and patterns involved.

### Manual

If you still want to do it manually, then follow the instructions below-

- Create the resource folder under `server/api` (e.g. `users`)

- Create `route.js`, this will have routing definitions for all the endpoints 
under this resource (e.g. `users/`, `users/2/profile`)

- Create `controller.js`; theoretically this is where you should use different services to cater your api flow

- Create `service.js`; this is where you should use different db repositories to cater business logic

- You should separate out your db access logic from services and put them in a separate file called `repository.js`; services will use it to get/manipulate db records

- You can have a `model.js` if required; which refers to the db schema required for this resource

- If same resource require multiple models, services etc. they should be grouped under a subfolder like models, services etc. 

    Example: for order management api resource, this can be a scenario-

    ```
    orders/
      models/
      - order.js
      - order-item.js

      services/
      - checkout.js
      - payment.js
    ```

- Now, create a `config.js` where you should have your endpoint defined, at least-

    ```
    const config = {
      ENDPOINT: '/order-items',
    };

    module.exports = config;
    ```

- Create an index file(`index.js`) and register the `route` and `config` to expose-

    ``` 
    module.exports = {
      route: require('./route'),
      config: require('./config'),
    };
    ```

- Finally register your resource in api index routing at `server/api/index.js`

    ``` 
    const orderItems = require('./order-items');

    ...
    router.use(orderItems.config.ENDPOINT, orderItems.route);

    module.exports = router;
    ```


> To know more, please take a look at the given sample api resource `user` or try generating a new resource by `npm run add-resource resource-name`

## Others

- To run tests: `npm run test`

- To check for lint errors: `npm run lint`


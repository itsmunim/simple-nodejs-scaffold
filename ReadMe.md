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
- [Structure](#structure)
- [Adding API Resource](#adding-api-resource)
- [Others](#others)



## Features

- Don't worry about the boilerplate anymore, jump right into writing your API
resources

- Easily start serving your frontend

- Have error handling and graceful shutdown support out of the box

- Structure your code in a domain driven approach- with right architectural practices in place



## Usage

- `npm install`

- This starts the server in port `8282`: `npm start`

- To run in different port: `PORT=8000 npm start`



## Serving Frontend 

- If your frontend dir has following structure

``` 
client/
| - index.html
| - resources/ <-- or may be static/ or dist/
```

then this can easily be served using-

```
CLIENT_DIR=<absolute path of your client app folder> npm start
```

- If your `index.html` file is at one place and folder with static files in another, then
the following might be your option-

```
INDEX=<absolute path of index.html> STATIC_DIR=<absolute path of static folder> npm start
```



## Structure

P.S. The addition of new cli command explained in next section will make your life easy- as adding a new api resource is just one command away! And it automatically generates the proper structure.

``` 
index.js <-- entry point for node
server <-- root folder for all functionalities
| - core <-- all the core functionalities belong here 
  | - shutdownManager.js 
  | - bootstrapper.js
  | - ...
  
| - config <-- all server specific config resides here
  | - index.js
  
| - api <-- all the api resources belong here
  | - index.js <-- any new api resource is registered here
  
  | - <resource>
    | - route.js <-- specific routing for this resource e.g. /user/all, /user/auth etc.
    | - controller.js <-- controller for this resource; uses services, controls api flow
    | - service.js <-- business logics reside here; uses repositories to access persistance layer
    | - repository.js <-- persistance layer access manager; all orm/db integrations should happen in this layer- single point to plugin/get rid of different integrations 
    | - model.js <-- if this resource needs a db model schema to be specified
    | - index.js <-- entry point for model, controller, service, route etc. for this resource
    | - test
      | - <type>.test.js <-- tests for this resource; type can be model, repository, controller
      etc. For each there should be one separate test file
      
| - testHelpers <-- test specific helpers, shared mocks, global vars should be here
  | - ...    
```



## Adding API Resource

Using the new cli tool bundled in this scaffold, adding a new api resource can be as easy as doing- `npm run gen-resource <resource-name-in-kebabcase>`

Example- `npm run gen-resource order-items`

Please read the comments generated with the files to better understand the architecture and patterns involved.

If you still want to do it manually, then follow the instructions below-

- Create the resource folder under `server/api` (e.g. `users`)

- Create `route.js`, this will have routing definitions for all the endpoints 
under this resource (e.g. `users/`, `users/2/profile`)

- Create `controller.js`; theoretically this is where you should use different services to cater your api flow

- Create `service.js`; this is where you should use different db repositories to cater business logic

- You can separate out your db access logic from controller and put them in a separate
file called `repository.js`; services will use it to get/manipulate db records

- You can have a `model.js` if required; which refers to the db schema required for this
resource

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

- Create an index file and register all these under the `index.js`

``` 
module.exports = {
  route: ...
  controller: ...
  model: ...
  repository: ...
};
```

- Ideally, only route should be exposed

- Finally register your resource in api index routing at `server/api/index.js`

``` 
const yourresource = require('./your-resource');

...
router.use('/your-resource', yourresource.route);

module.exports = router;
```

- To know more, please take a look at the given sample api resource `user` or try generating a new resource by `npm run gen-resource resource-name`



## Others

- To run tests: `npm run test`

- To check for lint errors: `npm run lint`


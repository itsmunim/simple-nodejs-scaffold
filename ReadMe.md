### Simple Node Server

A simple enough node server scaffolding to get you started on your project immediately


#### Features

- Don't worry about the boilerplate anymore, jump right into writing your API
resources

- Serve your frontend easily by providing the absolute path

- Have error handling and graceful shutdown support out of the box

- Structure your code in more maintainable and industry standard way


#### Running the Project

- `npm install`

- This starts the server in port `8282`: `npm start`

- To run in different port: `PORT=8000 npm start`

#### Serving a Client/Frontend 

- If your client app has following structure

``` 
client/
| - index.html
| - resources/ <-- or may be static/ or dist/
```

then this can easily be served using 

```
CLIENT_DIR=<absolute path of your client app folder> npm start
```

- If your `index.html` file is at one place and folder with static files in another, then
the following might be your option-

```
INDEX=<absolute path of index.html> STATIC_DIR=<absolute path of static folder> npm start
```


#### The Structure

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
    | - controller.js <-- controller for this resource, business and db access logics should
    reside here. Feel free to split up db access layer into a repository if you want
    | - repository.js <-- if you separate out db access codes from controller.js
    | - model.js <-- if this resource needs a model schema to be specified
    | - index.js <-- entry point for model, controller, repository and route for this resource
    | - test
      | - <type>.test.js <-- tests for this resource; type can be model, repository, controller
      etc. For each there should be one separate test file
      
| - test <-- test specific helpers, shared mocks, global vars should be here
  | - ...    
```

#### Exposing a new API Resource

- Create the resource folder under `server/api` (e.g. `user`)

- Create `route.js`, this will have routing definitions for all the endpoints 
under this resource (e.g. `user/all`, `user/2/profile`)

- Create `controller.js`; theoretically this is where you should put business and db
access logic for your resource

- You can separate out your db access logic from controller and put them in a separate
file called `repository.js`; controller will use it to get/manipulate db records

- Optionally you can have a `model.js`; which refers to the model required for this
resource

- Create an index file and register all these under the `index.js`

``` 
module.exports = {
  route: ...
  controller: ...
  model: ...
  repository: ...
};
```

- Finally register your api to the base api routing at `server/api/index.js`

``` 
const yourResource = require('./yourResource');

...
router.use('/yourResource', yourResource.route);

module.exports = router;
```

- To know more, please take a look at the given sample api resource `user`


#### Other Important Commands

- To run tests: `npm run test`

- To check for lint errors: `npm run lint`


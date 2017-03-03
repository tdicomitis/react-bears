#### EJS Bears

__learning Node, Mongo, Mongoose, Express, and EJS__

### Description
We are going to build an application which uses EJS to render different pages. The pages will be displaying 'bears'.
For example:

UI Routes:
/ => Home route, renders index.ejs
/view => This will render and EJS page that displays all bears.ddsfasdfsadfdfdf
/post => This will render a form, capable of creating a new bear.

#### Introducing MongoDB

pre-req:

1) Install MongoDB

  `brew install mongodb`

  Don't have [homebrew?](https://brew.sh/)

  `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`


2) Make the database in Locally

  `mkdir -p /data/db` or `sudo mkdir -p /data/db`

3) Run MongoDB Locally

  `mongod` or `sudo mongod`

----

Mongodb is a non-relational database. It is really nice for javascript developers because it stores data in formats that we are used to working with. A single piece of data is known as a document. In our application here is what a document will look like:

```js
  var someBear = {
    name: "Winnie the pooh",
    species: "Honey Bear",
    color: "Golden Brown",
  }
```
The above is a single document, a bunch of these documents, or bears, is known as a collection. A collection is just an array full of objects.

`var allBears = [someBear, anotherBear, moreBear];`


When the EJS page to show all bears, is rendered, it will be displaying actual data from our bears collection.

In order to interactive with our database we will design a __RESTful__ API

The types of interactions we have with our database are described by __HTTP__ verbs.

#### GET
This verb is used for retriving data.

#### POST
This verb is used to `create` a new piece of data.

#### PUT
This verb is used to edit.

#### DELETE
An API that implements all of these methods is known as a ### C.R.U.D. API. Because you have the ability to Create, Read, Update, and Delete.

----
#### Mongoose
We will be implementing routes using express `app.get` to apply our HTTP verbs that interact with our database. Mongoose is a tool layerd on top of Mongo, that makes these routes much easier to implement. It is known as an ORM (Object Relational Mapper).

A route that goest to our database, retrieves all bears, and sends these bears back in JSON would look like so:

```js

  app.get("/bears", function(req, res){
    Bear.find(function(err, bear){
      if(err){
       return "error getting all bears from database"
      } else {
      res.json(bear)
    }
  });

```
----


### Implementation

#### Step 0: Project Setup

We will begin by creating a basic server configured with express, ejs, and body parser.

`touch server.js`

`npm init` -> hit enter to accept defaults

We do not want to keep track of our node modules in GitHub, so we tell git to ignore all of these files.

`echo "node_modules/" >> .gitignore`

`npm install --save express body-parser ejs`

Make sure you look at `package.json` to see if your dependencies were updated.

Configure your server to create a basic express server, tell it to use the view engine ejs, and apply the body-parser middleware to your application.

```js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var server = app.listen(3000, function(){
  console.log('Server 🔥🔥🔥ed up on PORT 3000');
});

```

Ensure that your is functional before committing your code:
`nodemon server.js`

----
#### Step One: EJS Pages
In this step we will make the appropriate EJS files, and make routes to server these files.

Remembering that EJS pages must live in the views folder, create pages for index, view, and post.

`mkdir views`

`touch views/index.ejs views/view.ejs views/post.ejs`

Update each EJS page to have a basic HTML implementation. In `view.ejs` add some HTML for an unorderd list of bears. This is where our bears will eventually go. In `post.ejs` add a basic HTML form with input fields for bear name, species, and color.

Next we will define our routes that are responsible for serving each one of our `EJS` pages.

```js
// server.js

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/view', function(req, res) {
  res.render('view');
});

app.get('/post', function(req, res) {
  res.render('post');
});

```

Make sure you test your endpoints before committing your code.

----

#### Step Two: Design our API

Before we can create and save any data in our database we need to define what our data will look like. We are going to use something called a 'Schema', which will be used as a blueprint when creating new bears.

`npm install --save mongoose`

`mkdir models`

`touch models/bear.js`

```js
// models/bears.js

var mongoose = require('mongoose');

var BearSchema = new mongoose.Schema({
  name: String,
  color: String,
  species: String
});

module.exports = mongoose.model('Bear', BearSchema);

```

Lastly, import this file into `server.js`

`var Bear = require('./models/bear');`

The last thing we need to do before designing our API, is to require and configure our database in `server.js`

```js
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/mis-ejs-bears");

```

----

We now need to design our API, as a way to interact with our Database.
API implementation will follow this table:

| HTTP Verb     | Path          | Response  |
| ------------- |:-------------:| -----:|
| `GET`         | /api/bears    | responds with all bears in a our database |
| `POST`        | /api/bears    |   creates a new bear, responds with JSON of this bear |
| `GET`         | /api/bears/:bear_id      |    responds with JSON for the specific bear|
| `PUT`         | /api/bears/:bear_id      |    edit ability for specific bear|
| `DELETE`      | /api/bears/:bear_id      |    deletes a specific bear |

Let's implement the first two routes on this table:
```js
  // server.js

  app.get('/api/bears', function(req, res){
    Bear.find(function(err, data){
      if(err){
        console.log("Error finding your bear!")
      } else {
        res.json(data)
      }
    })
  });

  app.post('/api/bears', function(req, res){

    var newBear = new Bear();
    newBear.name = req.body.name;
    newBear.species = req.body.species;
    newBear.color = req.body.color;

    newBear.save(function(err, data){
      if(err){
        console.log(err);
      } else {
        res.json(data);
      }
    })
  });


  // This is the exact same implementation of the POST route, refactored:
  app.post('/api/bears', function(req, res){

    var newBear = new Bear({
      name: req.body.name,
      color: req.body.color,
      species: req.body.species
    });

    newBear.save(function(err, data){
      if(err){
        console.log(err);
      } else {
        res.json(data);
      }
    })
  });
```

Next we will use __Postman__ to test these two endpoints.
Test your `GET` method first, it will break if you have an error in your code, otherwise it will return an empty array.

Then test the POST route. (Dont forget to select the URL encoded option.)

After you create a couple of items, test your GET method again.

When your endpoints are working, commit your code.

----

### Step 3: Finish API endpoints that use `bear_id`

When you create a new object Mongo gives that object a unique id.

We access the `id` with `._id`

For example:
```
var teddy = new Bear({ name: "Teddy" });
console.log(teddy._id);
```

These unique IDs are extremely important generally in programming. When we do actions such as edit, or delete,
they are being imposed on exactly one item. We need to make sure we are changing the item of intention.

The `GET` and `DELETE` methods are relatively straightforward.

```js

app.get('/api/bears/:bear_id', function(req, res){
  Bear.findById(req.params.bear_id, function(err, data){
    if(err){
      console.log(err)
    } else {
      res.json(data)
    }
  });
});

app.delete('/api/bears/:bear_id', function(req, res){
  Bear.remove({ _id: req.params.bear_id }, function(err){
    if(err){
      console.log(err)
    } else {
      res.json({ message: "Successfully deleted the bear" })
    }
  })
});


```

The `PUT` route will be slightly more complicated. We will need to first find the specific bear we are looking for.
Once we have our bear, we only want to update the properties that receive new data. If there is no new data, it just uses the old data.
Hence the ternaries:

```js

app.put('/api/bears/:bear_id', function(req, res){
  Bear.findById(req.params.bear_id, function(err, bear){
    if(err){
      console.log(err)
    } else {
      bear.name = req.body.name ? req.body.name : bear.name;
      bear.species = req.body.species ? req.body.species : bear.species;
      bear.color = req.body.color ? req.body.color : bear.color;

      bear.save(function(er, updatedBear){
        if(er){
          console.log(er)
        } else {
          res.json(updatedBear);
        }
      });

    }
  });
});

```

Make sure you test all of your routes before committing your code.

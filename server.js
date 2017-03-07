var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Bear = require('./models/bear');
mongoose.connect("mongodb://localhost/react-bears");

var Bear = require('./models/bear');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/bears', function(req, res){
  Bear.find(function(err, bearData){
    if(err){
      console.log("Error finding your bear!")
    } else {
      res.json(bearData)
    }
  })
});

app.post('/api/bears', function(req, res){

  var newBear = new Bear();
  newBear.name = req.body.name;
  newBear.species = req.body.species;
  newBear.color = req.body.color;

  console.log(newBear);

  newBear.save(function(err, data){
    if(err){
      console.log(err);
    } else {
      res.json(data);
    }
  })
});

app.get('/api/bears/:bear_id', function(req, res){
  Bear.findById(req.params.bear_id, function(err, data){
    if(err){
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

app.delete('/api/bears/:bear_id', function(req, res){
  Bear.remove({ _id: req.params.bear_id }, function(err){
    if(err){
      console.log(err);
    } else {
      res.json({ message: "Successfully deleted the bear" });
    }
  })
});

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

var server = app.listen(3001, function(){
  console.log('Server 🔥🔥🔥ed up on PORT 3001');
});

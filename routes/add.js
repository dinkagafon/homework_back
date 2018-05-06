var express = require('express');
var router = express.Router();
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:Time500bd@localhost:5432/Tovars");

/**/
router.post('/',function(req,res){
  const name = req.body.name
  const price = req.body.price
  db.task(t => {
      return db.none('INSERT INTO products (name, price) VALUES($1, $2)', [name, price])
          .then(() => {
              return t.any("select * from products")
                .then(data => {
                    return res.json(data);
                })
                .catch(function (error) {
                    console.log("ERROR:", error);
                })
          });
  })
});


module.exports = router;

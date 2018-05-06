var express = require('express');
var router = express.Router();
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:Time500bd@localhost:5432/Tovars");
/*db.none('INSERT INTO products (name, price) VALUES(${name}, ${price})', {
    name: 'snow',
    price: 50
})*/


router.post('/',function(req,res){
  const id = req.body.id
  db.task(t => {
      return db.none('DELETE FROM products WHERE id = $1', [id])
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


/*const config = {
  user: 'postgres',
  password: 'Time500bd',
  host: 'localhost',
  port: 5432,
  database: 'Tovars',
};

const pool = new Pool(config);

pool.connect().then(client => {
  client.query('INSERT INTO products (id, name, price) VALUES (1, name, 50)').then(res => {
    client.release()
    console.log('hello from', res)
  })
  .catch(e => {
    client.release()
    console.error('query error eblan', e.message)
  })
})*/
/* GET users listing. */
//var pgp = require("pg-promise")(/*options*/);
//var db = pgp("postgres://postgres:Time500bd@localhost:5432/Tovars");

/*db.none('INSERT INTO products (name, price) VALUES(${name}, ${price})', {
    name: 'snow',
    price: 50
})*/

/*db.any("select * from products")
    .then(function (data) {
        console.log("DATA:", data[0]);
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });*/



module.exports = router;

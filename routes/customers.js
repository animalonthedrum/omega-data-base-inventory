var express = require('express');
var router = express.Router();
var pg = require('pg');


var config = {
  database: 'omega',
  host: 'localhost',
  port: 5432,
  max: 30
}; // end config obj
var pool = new pg.Pool(config);

router.get('/', function(req, res) {
  console.log('get hit to /customers');
  // connect to db
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error conencting to db');
      done();
      res.send('not working');
    } // end Error
    else {
      console.log('connected to db');
      var allCustomers = [];
      // create our query string
      // tell db to run query
      // hold results in variable
      var results = connection.query("SELECT * from customers ORDER BY last_name");
      results.on('row', function(row) {
        // loop through result set and push each row into an array
        allCustomers.push(row);
      }); // end
      results.on('end', function() {
        // close connection
        done();
        // send back data
        res.send(allCustomers);
      });
    } // end no error
  }); // end pool connect
}); // end /customers get


app.get('/orders', function(req, res) {
  console.log('get hit to /orders');
  // connect to db
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error conencting to db');
      done();
      res.send('not working');
    } // end Error
    else {
      console.log('connected to db');
      var allOrders = [];
      // create our query string
      // tell db to run query
      // hold results in variable
      var results = connection.query("SELECT * FROM orders, addresses, products, line_items ORDER BY order_date DESC");
      results.on('row', function(row) {
        // loop through result set and push each row into an array
        allOrders.push(row);
      }); // end
      results.on('end', function() {
        // close connection
        done();
        // send back data
        res.send(allOrders);
      });
    } // end no error
  }); // end pool connect
}); // end /customers get


var results = connection.query("SELECT line_items.unit_price, line_items.quantity, line_items.order_id;" +
  "line_items.product_id, products.description FROM customers;" +
  "JOIN addresses ON customers.id = addresses.customer_id;" +
  "JOIN orders ON addresses.id = orders.address_id;" +
  "JOIN line_items ON line_items.order_id = orders.id;" +
  "JOIN products ON products.id = line_items.product_id;");

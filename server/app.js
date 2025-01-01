// importing necessary modules
const mysql2 = require('mysql2');
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
require('dotenv').config()
let app = express()

// Use  body parser as middle ware
// app.use(body_parser.urlencoded({ extended: true }));

// // OR
// body parser using express
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// // If you work with business partners (for limitations)
// const corsOption = {
//   origin: [
//     "http://localhost:3000",
//     "https://evangadi.com",
//     "https://apple.com",
//   ],
// optionSuccessStatus: 200, // For Legacy Browser Support
// };
// app.use(cors(corsOption));

// //for any users (request from any where)
app.use(cors())
// For Up and Running page
app.get('/', (req,res)=>{res.send('Up and Running...')})

// // credential info
let myConnection = mysql2.createConnection({
  user: "myDBuser",
  password: process.env.password, // To hide our credential from vulnerability....
  host: "localhost",
  database: "myDB",
  multipleStatements: true,
});

// connecting into db
myConnection.connect((err) => {
  if (err) console.log(err);
  else console.log("Connected To MYSQL !!!");
});


app.get("/install", (req, res) => {
  let createTables = `
    CREATE TABLE IF NOT EXISTS Products (
        product_id INT AUTO_INCREMENT,
        product_name VARCHAR(255) NOT NULL,
        product_url VARCHAR(255) NOT NULL,
        PRIMARY KEY (product_id)
    );
    
    CREATE TABLE IF NOT EXISTS ProductDescription (
        description_id INT AUTO_INCREMENT,
        product_id INT NOT NULL,
        product_brief_description VARCHAR(255) NOT NULL,
        product_description VARCHAR(255) NOT NULL,
        product_img VARCHAR(255) NOT NULL,
        product_link VARCHAR(255) NOT NULL,
        PRIMARY KEY (description_id),
        FOREIGN KEY (product_id) REFERENCES Products(product_id)
    );

    CREATE TABLE IF NOT EXISTS ProductPrice (
        price_id INT AUTO_INCREMENT,
        product_id INT NOT NULL,    
        starting_price VARCHAR(255) NOT NULL,
        price_range VARCHAR(255) NOT NULL,
        PRIMARY KEY (price_id),
        FOREIGN KEY (product_id) REFERENCES Products(product_id)
    )`;

  // Executing the query's we wrote above
  myConnection.query(createTables, (err,results,fields) => {
    if (err) console.log(`Error Found: ${err}`);
  });
  res.send(`Tables created successfully`);
  console.log(`Tables created`);
});

app.post("/add-product", (req, res) => {
  console.table(req.body);

  // Destructuring request body
  const {
    product_name,
    product_url,
    product_brief_description,
    product_description,
    product_img,
    product_link,
    starting_price,
    price_range,
  } = req.body;

  // Insert into Products table
  let addToProduct = `INSERT INTO Products (product_name, product_url) VALUES (?, ?)`;
  myConnection.query(
    addToProduct,
    [product_name, product_url],
    (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error inserting into Products table");
      }

      const id = results.insertId;
      console.log(
        "id from products table to be used as a foreign key on the other tables>>> ",
        id
      );

      // Insert into ProductDescription table
      let addToProductDescription = `INSERT INTO ProductDescription (product_id, product_brief_description, product_description, product_img, product_link) VALUES (?, ?, ?, ?, ?)`;
      myConnection.query(
        addToProductDescription,
        [
          id,
          product_brief_description,
          product_description,
          product_img,
          product_link,
        ],
        (err, results, fields) => {
          if (err) {
            console.log(`Error Found in ProductDescription: ${err}`);
            return res
              .status(500)
              .send("Error inserting into ProductDescription table");
          }
        }
      );

      // Insert into ProductPrice table
      let addToProductPrice = `INSERT INTO ProductPrice (product_id, starting_price, price_range) VALUES (?, ?, ?)`;
      myConnection.query(
        addToProductPrice,
        [id, starting_price, price_range],
        (err, results, fields) => {
          if (err) {
            console.log(`Error Found in ProductPrice: ${err}`);
            return res
              .status(500)
              .send("Error inserting into ProductPrice table");
          }
        }
      );

      res.send("Data is successfully added");
    }
  );
});



///////////////////////////////////////////////////
// select statement
app.get('/iphones', (req, res) => {
  myConnection.query(
    "SELECT * FROM Products JOIN ProductDescription JOIN ProductPrice ON Products.product_id = ProductDescription.product_id AND Products.product_id = ProductPrice.product_id",
    (err, rows, fields) => {
      let iphones = { products: [] };
      iphones.products = rows;
      let stringIphones = JSON.stringify(iphones);

      if (!err) res.end(stringIphones)
      else console.log(err);
      // // using express method 
      // if (!err) res.json({ products: rows });
      // else console.log(err);
    }
  )
  
  
});

// listener function
let PORT = 1234;
app.listen(PORT, () =>{
  console.log(`Server is Running on port: http://localhost:${PORT}/`);
});

// ALTER TABLE product AUTO_INCREMENT = 1;



////  check it later 

  // CREATE TABLE IF NOT EXISTS UserTable (
  //   user_id INT AUTO_INCREMENT,
  //   user_name VARCHAR(255) NOT NULL,
  //   user_password VARCHAR(255) NOT NULL,
  //   PRIMARY KEY (user_id)
  // );
  // CREATE TABLE IF NOT EXISTS OrdersTable (
  //   order_id INT AUTO_INCREMENT,
  //   product_id INT NOT NULL,
  //   user_id INT NOT NULL,
  //   PRIMARY KEY (order_id), 
  //   FOREIGN KEY (product_id) REFERENCES ProductsTable(product_id),
  //   FOREIGN KEY (user_id) REFERENCES UserTable(user_id)
  // )`;
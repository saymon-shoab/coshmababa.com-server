const express = require('express');
const cors = require('cors');
// const MongoClient = require ('mongodb').MongoClient;
require('dotenv').config()
const { MongoClient } = require('mongodb');


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5h4lz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());
app.use(cors());

const port= 5000;

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log(err)
  const ProductCollection = client.db("coshmaweb").collection("product");
  const OrderCollection = client.db("coshmaweb").collection("order");

  app.post('/addProduct',(req,res)=>{
    
       const product = req.body;
       ProductCollection.insertOne(product)
       .then(result => {
         res.send(result.insertedCount>0)
       })
  })
  app.get('/products',(req,res)=>{
      ProductCollection.find({})
      .toArray((err,documents)=>{
        console.log(err)
        res.send(documents);
      })
  })
  app.post('/addOrder',(req,res)=>{
    const order =req.body;
    OrderCollection.insertOne(order)
    .then(result => {
      res.send(result.insertedCount>0)
    })
  })
});


app.listen(process.env.PORT || port)
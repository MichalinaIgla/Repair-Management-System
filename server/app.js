const express = require('express');
const app = express();
const serveIndex = require('serve-index');
const port = 8081;
var http = require('http');
const bodyParser = require('body-parser');
const shortid = require('shortid');
var shortNumber = require('short-number');
// const { default: axios } = require('axios');
const router = express.Router();
let cors = require('cors');


//lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);



app.set('json spaces', 2);
const requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next()
}

app.use(requestTime);

app.get('/', (req, res) => {
    let responseText = 'An alligator approaches!<br>'
    responseText += '<small>Requested at: ' + req.requestTime + '</small>'
    res.send(responseText)
});


app.use(cors());

//users

app.get('/users', (req, res) => {
    // if (!req.body.employee){

    // }
    res.json(db.get('users'));
});

app.get('/users/:id', (req, res) => {
    const id = req.param("id");
    res.json(db.get('users').find({ id: id }).value());
});


app.use(bodyParser.json());
app.post('/users', (req, res) => {//insert
    console.log(req.body);
    res.sendStatus(200);
});

app.put('/users', (req, res) => {  //edit user
    // const id = req.param("id");
    console.log(req.body);
    // let user = db.get('users').find({ id: Number(id) }).value();
    // db.get('users')
    // .find({ id: Number(id) })
    // .assign({ firstname: 'hi!'})
    // .write()
    res.sendStatus(200);
});

app.delete('/users/:id', (req, res) => {
    const id = req.param("id");
    db.get('users').remove({ id: id }).write();
    res.sendStatus(200);
});



// orders

app.get('/orders', (req, res) => {
    res.json(db.get('orders'));
 
});

app.get('/orders/e/:id', (req, res) => {
    const id = req.param("id");//dodac ify nullowe z ststusem 404
    res.json(db.get('orders').filter({ employee: id }).value());
     
});

app.get('/orders/:id', (req, res) => {
    const id = req.param("id");
    res.json(db.get('orders').find({ id: id }).value());
});

// new order
app.use(bodyParser.json());
app.post('/orders', (req, res) => {
    db.get('orders').push(
        {id: shortid.generate(),
        product: {
            category: req.body.product.category,
            name: req.body.product.name,
            defect: req.body.product.defect
        },
        owner: {
            firstname: req.body.owner.firstname,
            lastname: req.body.owner.lastname,
            phone: req.body.owner.phone,
            email: req.body.owner.email
        },
        receiveddate: req.body.receiveddate,
        receiptdate: req.body.receiptdate,
        status: req.body.status,
        employee: req.body.employee,
        price: req.body.price,
        description: req.body.description,
        }).write();
    res.sendStatus(200);
});

//update order
app.use(bodyParser.json());
app.put('/orders/:id', (req, res) => {
    const id = req.param("id");
    if(!req.body){
        throw 'Parameter is null!';
    }
    db.get('orders')
      .find({id: id})
      .assign(
        { 
            receiveddate: req.body.receiveddate,
            receiptdate: req.body.receiptdate,
            status: req.body.status,
            employee: req.body.employee,
            price: req.body.price,
            description: req.body.description,

        }).write();

    db.get('orders')
      .find({id: id}).get('owner')
      .assign(
        { 
            firstname: req.body.owner.firstname,
            lastname: req.body.owner.lastname,
            phone: req.body.owner.phone,
            email: req.body.owner.email,

        }).write();
        
    db.get('orders')
      .find({id: id}).get('product')
      .assign(
        { 
            category: req.body.product.category,
            name: req.body.product.name,
            defect: req.body.product.defect,

        }).write();
    res.sendStatus(200);
});

app.delete('/orders/:id', (req, res) => {
    const id = req.param("id");
    console.log(id);
    db.get('orders').remove({ id: id }).write();
    res.sendStatus(200);
});

module.exports = app;
// const server = app.listen(port, () => console.log(`Listening on port :${port}!`));
// module.exports = server;
// app.connect()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log('Listening on port: ' + PORT);
//     });
//   });

// const response =async() =>{ await axios.get('http://localhost:3000').then(res=> console.log(res.data));}
// response();
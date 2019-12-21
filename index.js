const express = require('express')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extend: false})
const MongoClient = require('mongodb')
const ObjectID = MongoClient.ObjectID
const url = 'mongodb://localhost:27017'
const app = express()
const port = 3000
// const userModel = require('../models/user.model')

app.set('view engine','pug')
app.use(express.static('public'))
app.use(urlencodedParser)

app.get('/', (req,res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        const db = client.db('comics')
        const collection = db.collection('superheroes')
        collection.find({}).toArray((err, superheroes) => {
          if (err) {
            console.log(err)
            return
          }
          client.close()
        //   console.log(superheroes)
          res.render('index', {superheroes: superheroes})
        })
      })
    })

app.get('/superheros/:id', (req,res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        const db = client.db('comics')
        const collection = db.collection('superheroes')
        collection.find({
          _id: ObjectID(req.params.id)
        }).toArray((err, superheroes) => {
          if (err) {
            console.log(err)
            return
          }
          const superheroe = superheroes ? superheroes[0] : null;
          client.close()
          res.render('superhero', {superheroe: superheroe})
        })
      })
    })

app.post('/superheros', urlencodedParser, (req,res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        const db = client.db('comics')
        const collection = db.collection('superheroes')
        collection.insertOne({
          name: req.body.superhero.toUpperCase(),
          image: 'blackwidow.jpg'
        }, (err, result) => {
          client.close()
          res.redirect('/')
        })
      })
    })

app.listen(port, () => {
    console.log(`Server111 running on port ${port}`)
})
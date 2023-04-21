const express = require("express");
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5500;

app.get("/", (req,res)=>{
    res.send("hi hello")
});
app.use(cors());
app.use(express.json());
require('dotenv').config();

// food-shop
// ygnMC707VDPexGj7

//////////////////////


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s0vwyit.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {serverApi: {version: ServerApiVersion.v1,strict: true,deprecationErrors: true,}});

async function run() {
  try {
    const foodCollaction = client.db("food-shop").collection("food");
    const reviewCollaction = client.db("food-shop").collection("Review");

    // food start
    app.get('/food', async(req, res)=>{
        const query = {};
        const cursor = await foodCollaction.find(query).limit(3).toArray();
        res.send(cursor)
    })
    app.get('/foodService', async(req, res)=>{
        const query = {};
        const cursor = await foodCollaction.find(query).toArray();
        res.send(cursor)
    })
    app.get('/food/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await foodCollaction.findOne(query);
        res.send(result)
    })
    app.post('/food', async(req, res)=>{
        const user = req.body;
        const result = await foodCollaction.insertOne(user);
        res.send(result)
    })
    
    // food end

    // Review start
    app.post('/review', async(req, res)=>{
        const user = req.body;
        const result = await reviewCollaction.insertOne(user);
        res.send(result)
    })
    app.get('/review', async(req, res)=>{
        let query = {};
        if(req.query.email){
            query ={
                email : req.query.email
            }
        }
        const cursor = await reviewCollaction.find(query).toArray();
        res.send(cursor)
    });
    app.delete('/review/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId (id)};
        const rusult = await reviewCollaction.deleteOne(query);
        res.send(rusult)
    })
    // Review end

  }
   finally {
    
  }
}
run().catch(console.dir);


//////////////////////

app.listen(port,()=>{
    console.log(`hi hello ${port}`)
})
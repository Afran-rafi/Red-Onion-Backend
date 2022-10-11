const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
app.use(cors());
app.use(express.json());
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@red-onion.84ukowe.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
    try{
        await client.connect();
        const Foods = client.db('Red_Onion').collection('Foods');

        app.get('/food', async (req, res)=> {
            const query = {};
            const cursor = Foods.find(query);
            const foods = await cursor.toArray();
            res.send(foods);
        });

        app.get('/food/:id', async (req, res)=> {
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await Foods.findOne(query);
            res.send(result);
        })
    }
    finally{

    }
};
run().catch(console.dir);

app.get('/', (req, res)=> {
    res.send('Mission MERN Stack Red Onion Project');
});

app.listen(port, ()=> {
    console.log(`Server is Running ${port}`);
});

// ETbTMHUtfzXSPQi8
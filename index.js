const express = require('express');
const cors = require('cors');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require("mongodb");

//middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.q9bdeff.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
  
     const appleCollection = client.db("DeviceDynasty").collection("Apple");
     const samsungCollection = client.db("DeviceDynasty").collection("Samsung");
     const googleCollection = client.db("DeviceDynasty").collection("Google");
     const sonyCollection = client.db("DeviceDynasty").collection("Sony");
     const intelCollection = client.db("DeviceDynasty").collection("Microsoft");
     const djiCollection = client.db("DeviceDynasty").collection("Dji");


    //* adding the product to the specific brand collection 
     app.post('/products',async(req,res)=>{
      const product = req.body
      const brand = product.brand
      console.log(brand)
      const filter = brand.photo
      
      if(brand === 'Apple'){
        const find = await appleCollection.findOne(filter)
        if(find){
          res.send({result:'Duplicate'})
        }else{
        const result = await appleCollection.insertOne(product)
        res.send(result)  
        }
        
      }
      if(brand === 'Samsung'){
        const find = await samsungCollection.findOne(filter)
        if(find){
          res.send({result:'Duplicate'})
        }else{
        const result = await samsungCollection.insertOne(product)
        res.send(result)  
        }
        
      }
      if(brand === 'Google'){
        const find = await googleCollection.findOne(filter)
        if(find){
          res.send({result:'Duplicate'})
        }else{
        const result = await googleCollection.insertOne(product)
        res.send(result)  
        }
        
      }
      if(brand === 'Sony'){
        const find = await sonyCollection.findOne(filter)
        if(find){
          res.send({result:'Duplicate'})
        }else{
        const result = await sonyCollection.insertOne(product)
        res.send(result)  
        }
        
      }
      if(brand === 'Microsoft'){
        const find = await intelCollection.findOne(filter)
        if(find){
          res.send({result:'Duplicate'})
        }else{
        const result = await intelCollection.insertOne(product)
        res.send(result)  
        }
        
      }
      if(brand === 'Dji'){
        const find = await djiCollection.findOne(filter)
        if(find){
          res.send({result:'Duplicate'})
        }else{
        const result = await djiCollection.insertOne(product)
        res.send(result)  
        }
        
      }
     })








    await client.db("admin").command({ ping: 1 });
    console.log(
      "Successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send(`Server is running on port ${port}`)
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
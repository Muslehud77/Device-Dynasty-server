const express = require('express');
const cors = require('cors');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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
     const microsoftCollection = client.db("DeviceDynasty").collection("Microsoft");
     const djiCollection = client.db("DeviceDynasty").collection("Dji");
     const cartCollection = client.db("DeviceDynasty").collection("Cart");


    //*for cart
    app.post('/cart',async(req,res)=>{
      const product = req.body
      const result = await cartCollection.insertOne(product)
      res.send(result)
    }) 
     
    app.get('/cart',async(req,res)=>{
      const result = await cartCollection.find().toArray()
      res.send(result)
    })

    app.delete('/cart/:id',async(req,res)=>{
      const id = {_id: new ObjectId(req.params.id)}
      const result = await cartCollection.deleteOne(id)
      res.send(result)
    })


    //* adding the product to the specific brand collection 
     app.post('/products',async(req,res)=>{
      const product = req.body
      const brand = product.brand
      console.log(product)
      const filter = {name : product.name}
      
      
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
        const find = await microsoftCollection.findOne(filter)
        if(find){
          res.send({result:'Duplicate'})
        }else{
        const result = await microsoftCollection.insertOne(product)
        res.send(result)  
        }
        
      }
      if(brand === 'DJI'){
        const find = await djiCollection.findOne(filter)
        if(find){
          res.send({result:'Duplicate'})
        }else{
        const result = await djiCollection.insertOne(product)
        res.send(result)  
        }
        
      }
     })

     app.get('/apple',async(req,res)=>{
      const result = await appleCollection.find().toArray()
      res.send(result)
     })
     app.get('/samsung',async(req,res)=>{
      const result = await samsungCollection.find().toArray()
      res.send(result)
     })
     app.get('/sony',async(req,res)=>{
      const result = await sonyCollection.find().toArray()
      res.send(result)
     })
     app.get('/microsoft',async(req,res)=>{
      const result = await microsoftCollection.find().toArray()
      res.send(result)
     })
     app.get('/dji',async(req,res)=>{
      const result = await djiCollection.find().toArray()
      res.send(result)
     })
     app.get('/google',async(req,res)=>{
      const result = await googleCollection.find().toArray()
      res.send(result)
     })


     //*get single data
     app.get("/:id",async(req,res)=>{
      const id = req.params.id
      if(id.includes('Apple')){
        const query = {_id : new ObjectId(id.replace('Apple',''))}
        const result = await appleCollection.find(query).toArray()
        res.send(result)
      }
      if(id.includes('Samsung')){
        const query = {_id : new ObjectId(id.replace('Samsung',''))}
        const result = await samsungCollection.find(query).toArray()
        res.send(result)
      }
      if(id.includes('DJI')){
        const query = {_id : new ObjectId(id.replace('DJI',''))}
        const result = await djiCollection.find(query).toArray()
        res.send(result)
      }
      if(id.includes('Google')){
        const query = {_id : new ObjectId(id.replace('Google',''))}
        const result = await googleCollection.find(query).toArray()
        res.send(result)
      }
      if(id.includes('Microsoft')){
        const query = {_id : new ObjectId(id.replace('Microsoft',''))}
        const result = await microsoftCollection.find(query).toArray()
        res.send(result)
      }
      if(id.includes('Sony')){
        const query = {_id : new ObjectId(id.replace('Sony',''))}
        const result = await sonyCollection.find(query).toArray()
        res.send(result)
      }
      
     });


     //*Update single data
     app.put("/:id",async(req,res)=>{
      const id = req.params.id
      const product = {$set:req.body}

      if(id.includes('Apple')){
        const query = {_id : new ObjectId(id.replace('Apple',''))}
        const result = await appleCollection.updateOne(query,product,{ upsert: true })
        res.send(result)
      }
      if(id.includes('Samsung')){
        const query = {_id : new ObjectId(id.replace('Samsung',''))}
        const result = await samsungCollection.updateOne(query,product,{ upsert: true })
        res.send(result)
      }
      if(id.includes('DJI')){
        const query = {_id : new ObjectId(id.replace('DJI',''))}
        const result = await djiCollection.updateOne(query,product,{ upsert: true })
        res.send(result)
      }
      if(id.includes('Google')){
        const query = {_id : new ObjectId(id.replace('Google',''))}
        const result = await googleCollection.updateOne(query,product,{ upsert: true })
        res.send(result)
      }
      if(id.includes('Microsoft')){
        const query = {_id : new ObjectId(id.replace('Microsoft',''))}
        const result = await microsoftCollection.updateOne(query,product,{ upsert: true })
        res.send(result)
      }
      if(id.includes('Sony')){
        const query = {_id : new ObjectId(id.replace('Sony',''))}
        const result = await sonyCollection.updateOne(query,product,{ upsert: true })
        res.send(result)
      }
      
     });

     //* delete single data
     app.delete("/:id",async(req,res)=>{
      const id = req.params.id
      if(id.includes('Apple')){
        const query = {_id : new ObjectId(id.replace('Apple',''))}
        const result = await appleCollection.deleteOne(query)
        res.send(result)
      }
      if(id.includes('Samsung')){
        const query = {_id : new ObjectId(id.replace('Samsung',''))}
        const result = await samsungCollection.deleteOne(query)
        res.send(result)
      }
      if(id.includes('DJI')){
        const query = {_id : new ObjectId(id.replace('DJI',''))}
        const result = await djiCollection.deleteOne(query)
        res.send(result)
      }
      if(id.includes('Google')){
        const query = {_id : new ObjectId(id.replace('Google',''))}
        const result = await googleCollection.deleteOne(query)
        res.send(result)
      }
      if(id.includes('Microsoft')){
        const query = {_id : new ObjectId(id.replace('Microsoft',''))}
        const result = await microsoftCollection.deleteOne(query)
        res.send(result)
      }
      if(id.includes('Sony')){
        const query = {_id : new ObjectId(id.replace('Sony',''))}
        const result = await sonyCollection.deleteOne(query)
        res.send(result)
      }
      
     });






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
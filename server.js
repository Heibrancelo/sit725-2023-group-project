const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = "mongodb+srv://akashdeepakashdeep271291:Ar1un%408ha@cluster0.iopmovp.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB URI

app.use(bodyParser.json());

// Define MongoDB connection and collection
let db;
const client = new MongoClient(mongoURI, { useNewUrlParser: true });

client.connect((err) => {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }
  db = client.db();
  console.log("Connected to MongoDB");
});

// Define API endpoints

// Get a list of all stalls
app.get("/api/stalls", (req, res) => {
  const stallsCollection = db.collection("stalls");
  stallsCollection.find().toArray((err, stalls) => {
    if (err) {
      console.error("Error fetching stalls:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(stalls);
  });
});

// Create a new stall
app.post("/api/stalls", (req, res) => {
  const stallsCollection = db.collection("stalls");
  const newStall = req.body;

  stallsCollection.insertOne(newStall, (err, result) => {
    if (err) {
      console.error("Error adding stall:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.status(201).json(result.ops[0]);
  });
});

// Get details of a specific stall by ID
app.get("/api/stalls/:id", (req, res) => {
  const stallsCollection = db.collection("stalls");
  const stallId = req.params.id;

  stallsCollection.findOne({ _id: ObjectId(stallId) }, (err, stall) => {
    if (err) {
      console.error("Error fetching stall:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (!stall) {
      res.status(404).json({ error: "Stall not found" });
      return;
    }

    res.json(stall);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

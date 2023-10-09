let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = "mongodb+srv://akashdeepakashdeep271291:Ar1un%408ha@cluster0.iopmovp.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB URI
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// Assign port to 3000
port = 3000;



app.use(express.static('public'));


async function runDBConnection() {
    try {
        await client.connect();
       collectionpayment = client.db().collection('PaymentDetails');
       console.log(collectionpayment);
    } catch (ex) {
        console.error(ex);
    }
}

app.listen(port, () => {
    console.log("Web server running at: http://localhost:3000");
    runDBConnection();
  });       

  function postDetails(payment, callback) {
    collectionpayment.insertOne(payment, (err, result) => {
        if (err) {
            console.error('Error inserting payment details:', err);
            callback(err, null);
        } else {
            console.log('Payment details inserted successfully:', result);
            callback(null, result);
        }
    });
}
app.post('/api/payment', (req, res) => {
    let payment = req.body;
    postDetails(payment, (err, result) => {
        if (err) {
            console.error('Error in /api/payment route:', err);
            res.status(500).json({ statusCode: 500, error: 'Internal Server Error', message: err.message });
        } else {
            res.status(201).json({ statusCode: 201, data: result, message: 'success' });
        }
    });
});













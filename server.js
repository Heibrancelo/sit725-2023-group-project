let express = require('express');

let app = express();

const path = require('path');

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://akashdeepakashdeep271291:Ar1un%408ha@cluster0.iopmovp.mongodb.net/?retryWrites=true&w=majority";

let port = process.env.port || 3000;

let collection;

let collection2;

let collection3;

let collectionStall;

let menuCollection;

 

app.use(express.static(__dirname + '/'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/images', express.static(__dirname + '/images'));

 

 

const client = new MongoClient(uri, {

    serverApi: {

        version: ServerApiVersion.v1,

        strict: true,

        deprecationErrors: true,

    }

});

 

 

async function runDBConnection() {

    try {

        await client.connect();

       collection = client.db().collection('Signup');

       console.log(collection);

    } catch (ex) {

        console.error(ex);

    }

}

 

async function runDBConnection2() {

    try {

        await client.connect();

       collection2 = client.db().collection('Feedback');

       console.log(collection2);

    } catch (ex) {

        console.error(ex);

    }

}

 

async function runDBConnection3() {

    try {

        await client.connect();

       collection3 = client.db().collection('Login');

       console.log(collection3);

    } catch (ex) {

        console.error(ex);

    }

}

 

async function runDBConnectionStall() {

    try {

        await client.connect();

       collectionStall = client.db().collection('ListofStalls');

       console.log(collectionStall);

    } catch (ex) {

        console.error(ex);

    }

}

 

async function runDBmenuCollection() {

    try {

        await client.connect();

        menuCollection = client.db().collection("Menus");

        console.log("Connected to MongoDB");

        console.log(menuCollection);

    }catch (ex) {

        console.error(ex);

    }

 

}

 

app.get('/', function (req, res) {

    res.render('index.html');

});

 

 

app.get('/menu', async function (req, res) {

    try {

        const restaurantId = req.query.id;

        const name = req.query.name || '';

        const menuItems = await menuCollection.find({ restaurentId: restaurantId }).toArray();

        res.render('menu', { menuItems, name, restaurantId });

    } catch (error) {

        console.error(error);

        res.status(500).send('Server error');

    }

});

 

 

 

//mongodb id

app.get('/filterItems/:itemId', async (req, res) => {

    try {

        const itemId = req.params.itemId;

        const filteredItems = await menuCollection.find({ _id: itemId }).toArray();

        res.json(filteredItems);

    } catch (error) {

        console.error(error);

        res.status(500).json({ error: 'Server error' });

    }

});

 

 

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

 

 

app.post('/api/signup', (req,res)=>{

    let signup = req.body;

    postSignup(signup);

});

 

function postSignup(signup) {

    collection.insertOne(signup);

}

 

app.post('/api/feedback', (req,res)=>{

    let feedback = req.body;

    postFeedback(feedback);

});

 

function postFeedback(feedback) {

    collection2.insertOne(feedback);

}

 

app.post('/api/login', (req,res)=>{

    let login = req.body;

    postLogin(login);

});

 

function postLogin(login) {

    collection3.insertOne(login);

}

 

app.listen(port, () => {

    console.log('express server started');

    runDBConnection();

    runDBConnection2();

    runDBConnection3();

    runDBConnectionpayment();

    runDBConnectionStall();

    runDBmenuCollection();

});

 

async function runDBConnectionpayment() {

    try {

        await client.connect();

       collectionpayment = client.db().collection('PaymentDetails');

       console.log(collectionpayment);

    } catch (ex) {

        console.error(ex);

    }

}

async function postDetails(payment) {

    result= await collectionpayment.insertOne(payment);

}

app.post('/api/payment',async (req, res) => {
    let payment = req.body;
    await postDetails(payment, (err, result) => {
        if (err) {
            console.error('Error in /api/payment route:', err);
            res.status(500).json({ statusCode: 500, error: 'Internal Server Error', message: err.message });
        } else {
            res.status(201).json({ statusCode: 201, data: result, message: 'success' });
        }
    });
});

app.get('/api/payment-history', async (req, res) => {
    const result = await collectionpayment.find({}).toArray();
    res.status(200).json({ statusCode: 200, data: result, message: 'success' });
})

 
async function postDetails(payment, callback) {
    const result = await collectionpayment.insertOne(payment);
    callback(null, result);
}


// Add Stall Collection

app.get('/api/stallInfo', (req,res) => {

    getStallInfo((err,result)=>{

        if (!err) {

            res.json({statusCode:200, data:result, message:'Showing all stalls now'});

        }

    });

});

 

 

app.post("/api/stallInfo", (req, res) => {
    let stallInfo = req.body;
    postStallInfo(stallInfo, (err, data) => {
        res.status(201).json({ data })
    });

});

 

 

async function postStallInfo(stallInfo, callback) {
   const result= await  collectionStall.insertOne(stallInfo) 
   callback(null, result)
}



 

 

async function getStallInfo(callback){

    const result= await collectionStall.find({}).toArray();
    callback(null,result)

}

 
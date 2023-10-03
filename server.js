let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://akashdeepakashdeep271291:Ar1un%408ha@cluster0.iopmovp.mongodb.net/?retryWrites=true&w=majority";
let port = process.env.port || 3000;
let collection;
let collection2;
let collection3;

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


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

app.get('/', function (req, res) {
    res.render('index.html');
});


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
});
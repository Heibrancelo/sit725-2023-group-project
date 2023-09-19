let express = require('express');
let app = express();
let port = process.env.port || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://SaiPreethi:admin@cluster0.x6mcnwu.mongodb.net/?retryWrites=true&w=majority";

let collection;

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');  
app.set('views', __dirname);

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function runDB() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      collection = client.db().collection("Items");
      console.log(collection);
    } catch (ex) {
        console.error(ex);
    }
}



app.get('/', async (req, res) => {
  try {
    const Drink = await collection.find({ itemCategory: 'Drink' }).toArray();
    console.log(Drink)
    const Starters = await collection.find({ itemCategory: 'Starter' }).toArray();
    console.log(Starters)

    const mainCourse = await collection.find({ category: 'maincourse' }).toArray();

    res.render("menu", { Drink, Starters, mainCourse });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, ()=>{
    console.log('express server started');
    runDB();
});
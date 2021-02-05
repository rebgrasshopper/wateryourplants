const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
require('./controllers/ORM');
const gardenRoutes = require("./routes");
const cors = require('cors')


//create app
const app = express();
app.use(cors())
const server = require('http').createServer(app);

//set app options
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", gardenRoutes);


//set mongoose connection and options
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/watery', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

//open mongoose connection
const connection = mongoose.connection;
connection.once('open', function(){
    console.log("\nConnected to mongoose\n\n ---------- let's go! ---------------\n\n");
});

server.listen(PORT, () => {
    console.log(`\nServer open on port: ${PORT}\n`)
});
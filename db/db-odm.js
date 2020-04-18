const mongoose = require('mongoose');

const URI = 'mongodb://localhost/rest-api';
const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
};

// Connect to a MongoDB database
mongoose.connect(URI, OPTIONS);

// Check for errors/success during connection to DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));        // errors
db.once('open', () => console.log('Connected to the database: ', URI));  // everything works

// Create a new schema
const memberSchema = new mongoose.Schema({
    name: String,
    email: String,
    status: String
});

// Define schema methods
memberSchema.methods.greet = () => {
    console.log(`Hello there! My name is ${this.name}, my email is ${this.email}.`);
};

// Create the model referred to a schema
const Member = mongoose.model('Member', memberSchema, );

// Create an instance of a model
const newMember = new Member({
    name: 'Leonardo Bianconi',
    email: 'leonardobianconi@rocketmail.com',
    status: 'active'
});

// Save instance in the database
//newMember.save((err, member) => {                   // callback!
//    if (err) return console.error(err);
//    member.greet();
//});

module.exports = Member;
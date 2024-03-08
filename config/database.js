const mongoose = require ("mongoose");
require ("dotenv").config ();

const dbConnect = () => {
    mongoose.connect (process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then ( () => console.log ("DB successfully connected"))
    .catch ( (error) => console.log ("Error received when connecting to the db", error));
}

module.exports = dbConnect;
const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://localhost/songapp');

export default db;

console.log("connected to database");

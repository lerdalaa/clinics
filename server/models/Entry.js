const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db = mongoose.createConnection(process.env.MONGO_URI_ENTRIES, {useNewUrlParser: true, useUnifiedTopology: true});

const EntrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  tags: { type: String, required: false },
}, {timestamps: true});

const Entry = db.model('Entry', EntrySchema);

module.exports = Entry;
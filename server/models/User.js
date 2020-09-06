const mongoose = require('mongoose');

const db = mongoose.createConnection('mongodb+srv://apetiss:apetiss666@cluster0-jdwph.mongodb.net/TravelUsers?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
}, {timestamps: true});

const User = db.model('User', UserSchema);

module.exports = User;
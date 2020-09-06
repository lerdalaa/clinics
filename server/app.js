const express = require('express');
const cors = require('cors');
//const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Entry = require('./models/Entry');
const User = require('./models/User');

const app = express();

dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/getentries', async (req, res) => {
  const entries = await Entry.find();
	res.json(entries);
});

app.post('/addentry', async (req, res) => {
	const entry = new Entry(req.body);
  const createdEntry = await entry.save();
	res.json(createdEntry);
});

app.post('/adduser', async (req, res) => {
	const user = new User(req.body);
  const createdUser = await user.save();
	res.json(createdUser);
});

app.post('/finduser', async (req, res) => {
	console.log('checking if user '+req.body.username+' exists...')
	let user = '';
	try {
		user = await User.find({ username: req.body.username});
		console.log('found '+user);
	} catch (error) {
		console.error(error);
	}
	res.json(user);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
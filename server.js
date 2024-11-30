// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017');


// const db = mongoose.connection;

// db.on('error', (error) => {
//     console.error('MongoDB connection error:', error);
// });

// db.once('open', () => {
//     console.log('Connected to MongoDB');
// });

// // Create a schema for the form data
// const formDataSchema = new mongoose.Schema({
//     name: String,
//     password: String
// });

// // Create a model using the schema
// const FormData = mongoose.model('FormData', formDataSchema);

// // Use body-parser middleware to parse form data
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve static files from the 'public' directory
// app.use(express.static('public'));


// // Serve the page
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/views/landingpg.html');
// });

// //serve the login page
// app.get('/login', (req, res) => {
//     res.sendFile(__dirname + '/views/login.html');
// });

// app.get('/signup', (req, res) => {
//     res.sendFile(__dirname + '/views/signup.html');
// });

// // Handle form submission
// app.post('/submit', (req, res) => {
//     const { name, password } = req.body;

//     // Create a new document with the submitted data
//     const formData = new FormData({ name, password });

//     // Save the document to the database
//     formData.save()
//         .then(() => {
//             // res.send('Data saved successfully');
//             res.sendFile(__dirname + '/views/index.html');

//         })
//         .catch((error) => {
//             console.error(error);
//             res.send('Error saving data');
//         });
// });


// // will enter login code later

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
















const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); 

const app = express();

mongoose.connect('mongodb://localhost:27017/myAuthApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/landingpg.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/views/signup.html');
});

app.post('/signup', async (req, res) => {
    const { name, password } = req.body;

    try {
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res.send('User already exists. Please log in.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, password: hashedPassword });

        await newUser.save();

        res.sendFile(__dirname + '/views/login.html');
    } catch (error) {
        console.error('Error signing up:', error);
        res.send('Error creating account. Please try again.');
    }
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.send('User not found. Please sign up.');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.send('Incorrect password. Please try again.');
        }

        res.sendFile(__dirname + '/views/index.html'); 
    } catch (error) {
        console.error('Error logging in:', error);
        res.send('Error logging in. Please try again.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

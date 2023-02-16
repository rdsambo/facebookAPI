const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8880;


app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
    const msg = req.msg;
    const token = req.token;
    console.log('msg='+msg);
    console.log('token='+token);
});
app.get('/', (req, res) => {
	res.send('Hello World!... from express');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

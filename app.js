const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.status(200).json({ message: 'hello from server', app: 'wildtrek' });
});

app.post('/', (req, res) => {
	res.send('one can post here');
});

// server listening for requests
app.listen(port, () => console.log(`app runing on port ${port}...`));

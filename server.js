const app = require('./app');
const port = 3000;

// server listening for requests
app.listen(port, () => console.log(`app runing on port ${port}...`));
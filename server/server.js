const app = require('./app.js');
const port = 8081;
const server = app.listen(port, () => console.log(`Listening on port :${port}!`));
module.exports = server;
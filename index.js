const express = require('express');
const app = express();

const { config } = require('./config/index');

app.listen(config.port, () => {
    console.log(`Listening in port http://localhost:${config.port}`);
})

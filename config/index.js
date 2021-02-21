require('dotenv').config();

const config = { 
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    firstName: process.env.FIRST_NAME,
    lastname: process.env.LASTNAME
}

module.exports = { config };
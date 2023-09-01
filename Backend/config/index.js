const  dotenv  = require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const JWTSECRETKEY = process.env.JWTSECRETKEY;

module.exports = {
    PORT,
    MONGODB_CONNECTION_STRING,
    JWTSECRETKEY
}
const express = require("express");
const router = express.Router()


// Example Route Passing
const exampleRoute = require('./example/example');
router.use('/example', exampleRoute);




module.exports = router;

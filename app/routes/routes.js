const express = require("express");
const router = express.Router()


// Example Route Passing
const exampleRoute = require('./example');
router.use('/example', exampleRoute);


// ============= ROUTES =============
// EXERCISE
const exerciseRoute = require('./exercise');
router.use('/exercise', exerciseRoute);


module.exports = router;

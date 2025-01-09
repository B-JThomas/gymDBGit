//=====IMPORTS=====//
const express = require('express');
const app = express();
const cors = require("cors");
const routes = require('./app/routes/routes');


//=====MIDDLEWARE=====//
app.use(cors());
app.use(express.json());


//=====ALL ROUTES=====//
app.use('/api', routes);

//======SERVER======//
const PORT = process.env.PORT ?? 5001;
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});

const express = require("express");
const connectDB = require("./configs/database");
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/requests');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);


connectDB()
  .then(() => {
    console.log("database connection established");
    app.listen(7777, () => {
      console.log("server is working on this port");
    });
  })
  .catch((err) => {
    console.log("database cannot connect" + err.message);
  });


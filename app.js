require("dotenv").config();
require('express-async-errors');

const connectDB = require("./db/connect");
const express = require("express");
const cors = require('cors')
const app = express();
const auth = require("./routes/auth");
const users = require("./routes/users");
const woocommerce = require("./routes/woocommerce");
const siigo = require("./routes/siigo");

app.use(express.json());

app.use(cors())
app.get("/", (req, res) => {res.send("Hello World");});
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/woocommerce", woocommerce);
app.use("/api/v1/siigo", siigo);

const port = process.env.PORT || 3000;

const start = async () => {

    try {        
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })

    } catch (error) {
       console.log(error); 
    }
}

start();


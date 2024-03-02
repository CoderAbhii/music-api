const express = require("express");
const cors = require("cors");
const { success, error } = require("consola");
const { connect } = require("mongoose");
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
    res.send("Welcome To Music Api");
});

app.use("/api/v1", require('./routes/music.route'));


app.use((req, res, next) => {
    res.status(404).json({
        error: "Page not found"
    })
})

const startApp = () => {
    try {
        connect(process.env.MONGO_URI);
        success({
            message: `Successfully connected with database`,
            badge: true
        });
        app.listen(process.env.PORT, () => success({
            message: `Server started on port ${process.env.PORT}`,
            badge: true
        }));
    } catch (err) {
        error({
            message: `Connection terminated \n ${err}`,
            badge: true
        });
    }
};


startApp();
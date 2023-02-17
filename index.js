const express = require('express');
const path = require("path")
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const armData = require('./routes/armData');
const armControl = require('./routes/armControl');

const app = express();
const port = 3000;

global.user = null;

global.db = new sqlite3.Database('./store.db', function (err) {
    if (err) {
        console.error(err);
        process.exit(1);
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON");
    }
});

app.set('view engine', 'ejs');
app.get('/', armData);

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use("/css", express.static(path.join(__dirname, "statics/css")));

app.use('/arm', armControl);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});



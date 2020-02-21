// require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
var cors = require('cors');
var CronJob = require('cron').CronJob;
const { handleError } = require('./utils/error_handler');
const httpLogger  = require('./utils/http_logger');
const { logger } = require('./utils/logger');



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(httpLogger);



//set our client folder and view
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client"));
app.use(express.static(path.join(__dirname, "../client")));


process.on('unhandledRejection', (error, promise) => {
    logger.info(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
    logger.error(' The error was: ', error );
});

process.on('uncaughtException', err => {
    logger.error('uncaughtException', err)
})


app.use(require('./routes/index'));
app.use((err, req, res, next) => {
    handleError(err, res);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    // console.log("running at localhost: " + port);
    logger.info(`Server listening on port ${port}`);

    // sendEmail('officialanoti@gmail.com')
    // new CronJob('0/5 * * * * *', function() {
    //     console.log('You will see this message every second', new Date());
    // }, null, true, 'America/Los_Angeles');
});
const app = require('express')();
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const uri = process.env.MONGO || "mongodb://localhost:27017/tracker";

app.use('/list', require('./routes/files'));
app.use('/download', require('./routes/download'));

mongoose.set('useFindAndModify', false);

// Wait for mongoose connection then start express.
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then(async () => {
    console.log("MongoDB connected!");
    console.log("Starting expressjs server..");

    app.listen(port, () => {
        console.log(`DownloadTracker listening at ${port}`);
    })

});

module.exports = app;
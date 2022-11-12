const express = require('express');
const app = express();
const label = require ('./labelAPI.js');
const wash = require ('./washAPI.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('static'));

app.use((req,res,next) => {
    console.log(req.method + ' ' + req.url)
    next()
})


app.use('/api/v1/label/', label);
app.use('/api/v1/wash/', wash);

app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
    console.log('404 not found');
});



module.exports = app;
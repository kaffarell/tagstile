//mongodb+srv://tagstile:<password>@tags.tzhjoji.mongodb.net/?retryWrites=true&w=majority



const app = require('./app/app.js');
const mongoose = require('mongoose');

const port = process.env.PORT|| 3000;


mongoose.connect('mongodb+srv://tagstile:tagstile@tags.tzhjoji.mongodb.net/?retryWrites=true&w=majority')
.then ( () => {
    
    console.log("Connected to Database");
    
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
    
});

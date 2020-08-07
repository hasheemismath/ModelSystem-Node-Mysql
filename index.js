const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

const db = require("./model");
const Role = db.role;

db.sequelize.sync({force:true}).then(()=>{
    console.log("Drop and resync Db");
    initial();
})

function initial(){
    Role.create({
        id:1,
        name:"user"
    });
    Role.create({
        id:2,
        name:"moderator"
    });
    Role.create({
        id:3,
        name: "admin"
    })

}

// initial() function helps us to create 3 rows in database.
//     In development, you may need to drop existing tables and re-sync database. So you can use force: true as code above.
//
//     For production, just insert these rows manually and use sync() without parameters to avoid dropping data:

// ...
// const app = express();
// app.use(...);
//
// const db = require("./app/models");
//
// db.sequelize.sync();
// ...
// Learn how to implement Sequelize One-to-Many Relationship at:

// https://bezkoder.com/sequelize-associate-one-to-many/

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.get("/",(req,res)=>{
    res.json({
        message :"Welcome to application"
    })
})

const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log("Server is up and running")
})


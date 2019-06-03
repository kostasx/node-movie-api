// IMPORT DEPENDENCIES
const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");
app.use( bodyParser.json() );

// CONFIGURE THE DATABASE
const DB_PATH = "database.db";

// CREATE A MOVIES ROUTE (GET)
app.get( "/movies", (req, res)=>{
    const db = new sqlite3.Database( DB_PATH, (err)=>{
        if (err){ return console.log(err); }
        db.all(`SELECT * FROM Movies`, (err, results)=>{

            res.status(200).json({
                "movies": results
            });
            db.close();

        });

    });
});

// CREATE AN ADD MOVIE ROUTE (POST)
app.post( "/add_movie", (req, res)=>{
    const db = new sqlite3.Database( DB_PATH, (err)=>{
        if ( err ){ return console.log(err); }
        db.run(`
        INSERT INTO movies (title, rating) VALUES (?, ?)
        `,[req.body.title, req.body.rating], (err)=>{
            if (err) { 
                db.close(); 
                return console.log(err); 
            }
            res.status(200).json({
                msg: "Entry succesfully inserted to the DB",
                body: req.body
            });
        })

    });
});

// START SERVER
app.listen( 5000 );
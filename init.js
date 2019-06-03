const sqlite3 = require("sqlite3");
const db = new sqlite3.Database( 'database.db', (err)=>{
    if ( err ){ console.log("Error connecting to database."); }
    db.run(`
        CREATE TABLE Movies(
            id integer NOT NULL PRIMARY KEY,
            title text NOT NULL,
            rating integer NOT NULL
        )
    `, (err)=>{
        if ( err ){
            console.log( "Error creating table: ", err );
        } else {
            console.log( "Table succesfully created." );
        }
        db.close();
    });
});
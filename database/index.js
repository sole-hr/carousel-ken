require("dotenv").config();
const knex = require("knex")({
  client: "pg",
  connection: process.env.POSTGRES_URL,
  pool: {
    afterCreate: function(conn, done) {
      // in this example we use pg driver's connection API
      conn.query('SET timezone="UTC";', function(err) {
        if (err) {
          // first query failed, return error and don't try to make next query
          done(err, conn);
        } else {
          console.log("CONNECTED TO PG");
          done(err, conn);
        }
      });
    }
  }
});

knex("related_shoe")
  .where("main_sku", 500000)
  .then(result => {
    console.log(result);
  });

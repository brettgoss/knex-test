var input = process.argv[2];
const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  findName(input);

});

function findName (input) {
  client.query("SELECT * FROM famous_people WHERE first_name=$1 OR last_name=$1",[input], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    output(result);
    client.end();
  });
}
function output (result) {
  console.log("Searching....");
  console.log(`Found 1 person by the name '${input}':`);
  var result = result.rows[0];
  console.log(`- ${result.id}: ${result.first_name} ${result.last_name}, born ${result.birthdate.toDateString()}`);
}

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS current_users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR ( 255 ) NOT NULL,
  last_name VARCHAR ( 255 ) NOT NULL,
  username VARCHAR ( 255 ) NOT NULL UNIQUE,
  password VARCHAR ( 255 ) NOT NULL,
  membership_status BOOLEAN NOT NULL,
  admin_status BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER REFERENCES current_users,
  title VARCHAR ( 255 ) NOT NULL,
  date_created TIMESTAMP NOT NULL,
  description TEXT NOT NULL
);
`;

// Reset table
const resetTableSQL = `
DROP TABLE items;
DROP TABLE categories;
`;

async function main(dbConnection) {
  console.log("seeding...");
  const client = new Client({
    connectionString: dbConnection,
  });
  await client.connect();
  console.log("connected");
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main(process.argv[2]);

// use script: npm run createdb "Local/ remote db url"

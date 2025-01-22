const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) UNIQUE NOT NULL
);

INSERT INTO categories (name)
VALUES 
  ('Fruit');

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_id INTEGER REFERENCES categories,
  name VARCHAR ( 255 ) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(6, 2) NOT NULL
);

INSERT INTO items (category_id, name, description, price)
VALUES 
  (1, 'Apple', 'Shiny apple here', 1.99);
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

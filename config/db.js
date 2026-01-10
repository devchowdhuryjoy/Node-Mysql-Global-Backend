// const mysql = require('mysql2');

// const db = mysql.createConnection({
//   host: 'localhost',   // Your DB host
//   user: 'root',        // Your DB username
//   password: '',        // Your DB password
//   database: 'globalroutewayconsults'   // Your DB name
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err);
//     return;
//   }
//   console.log('Database connected successfully!');
// });

// module.exports = db;



const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'u376244250_globalrouteway',
  password: '@Zt~&mAD6',
  database: 'u376244250_globalrouteway'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Database connected successfully!');
});

module.exports = db;

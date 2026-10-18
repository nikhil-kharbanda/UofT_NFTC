const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

const dbUrl = process.env.DATABASE_URL || process.env.JAWSDB_URL;

if (dbUrl) {
  // Hosted MySQL (e.g. Aiven) requires SSL. Strip query params like
  // ?ssl-mode=REQUIRED, which mysql2 doesn't understand, and set SSL here instead.
  const url = new URL(dbUrl);
  url.search = '';

  const caPath = path.join(__dirname, 'ca.pem');
  const ca = fs.existsSync(caPath) ? fs.readFileSync(caPath, 'utf8') : process.env.DB_CA_CERT;

  sequelize = new Sequelize(url.toString(), {
    dialect: 'mysql',
    dialectOptions: {
      ssl: ca ? { ca, rejectUnauthorized: true } : { rejectUnauthorized: false }
    }
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;

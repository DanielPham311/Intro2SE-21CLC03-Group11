const dbConfig = {
  host: "localhost",
  user: "your_database_username",
  password: "your_database_password",
  database: "your_database_name",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

module.exports = dbConfig;
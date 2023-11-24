const pool = require('./dbConnection');
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to the MySQL server.');
 
    // Perform your database operations here
    // Example: SELECT * FROM users
 
    connection.release();
  } catch (error) {
    console.error('Error connecting to the MySQL server:', error);
  }
})();
const pool = require('../../config/db'); // Your database connection

const Example = {
  create: async (data) => {
    // Insert a new record into the table
    try {
      console.log(data);
      const example = data.data;
      const newExample = await pool.query(
        "INSERT INTO example (name) VALUES($1) RETURNING *", 
        [example]
      );
      return newExample.rows[0];
    } catch (error) {
      console.log("Error in create:", error.message);
      throw error;
    }
  },
  findAll: async () => {
    // Retrieve all records
    try {
      const allExamples = await pool.query("SELECT * FROM example");
      return allExamples.rows;
    } catch (error) {
      console.log("Error in findAll:", error.message);
      throw error;
    }
  },
  findById: async (id) => {
    // Retrieve a specific record by ID
    try {
      const example = await pool.query("SELECT * FROM example WHERE id = $1", [id]);
      if (example.rows.length === 0) {
        throw new Error(`Example with id ${id} not found.`);
      }
      return example.rows[0];
    } catch (error) {
      console.log("Error in findById:", error.message);
      throw error;
    }
  },
  update: async (id, data) => {
    // Update a record dynamically
    try {
      const { name } = data;
      const updatedExample = await pool.query(
        "UPDATE example SET name = $1 WHERE id = $2 RETURNING *", 
        [name, id]
      );
      if (updatedExample.rows.length === 0) {
        throw new Error(`Example with id ${id} not found.`);
      }
      return updatedExample.rows[0];
    } catch (error) {
      console.log("Error in update:", error.message);
      throw error;
    }
  },
  delete: async (id) => {
    // Delete a record by ID
    try {
      const deletedExample = await pool.query(
        "DELETE FROM example WHERE id = $1 RETURNING *", 
        [id]
      );
      if (deletedExample.rows.length === 0) {
        throw new Error(`Example with id ${id} not found.`);
      }
      return deletedExample.rows[0];
    } catch (error) {
      console.log("Error in delete:", error.message);
      throw error;
    }
  },
};

module.exports = Example;

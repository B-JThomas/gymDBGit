const pool = require('../../config/db'); // Your database connection

const Exercise = {
  create: async (data) => {
    // Insert a new exercise record into the table
    try {
      let columns = [];
      let values = [];
      let paramIndex = 1;

      if (data.name) {
        columns.push('name');
        values.push(data.name);
        paramIndex++;
      }
      if (data.description) {
        columns.push('description');
        values.push(data.description);
        paramIndex++;
      }
      if (data.video_url) {
        columns.push('video_url');
        values.push(data.video_url);
        paramIndex++;
      }
      if (data.created_by) {
        columns.push('created_by');
        values.push(data.created_by);
        paramIndex++;
      }
      if (data.is_public !== undefined) {
        columns.push('is_public');
        values.push(data.is_public);
        paramIndex++;
      }

      // Ensure there's at least one field to insert
      if (columns.length === 0) {
        throw new Error('No valid fields provided for insert.');
      }

      const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
      const query = `INSERT INTO exercises (${columns.join(', ')}) VALUES (${placeholders}) RETURNING *`;

      const newExercise = await pool.query(query, values);
      return newExercise.rows[0];

    } catch (error) {
      console.log("Error in create:", error.message);
      throw error;
    }
  },
  
  findAll: async () => {
    // Retrieve all exercises
    try {
      const allExercises = await pool.query("SELECT * FROM exercises");
      return allExercises.rows;
    } catch (error) {
      console.log("Error in findAll:", error.message);
      throw error;
    }
  },
  
  findById: async (id) => {
    // Retrieve a specific exercise by ID
    try {
      const exercise = await pool.query("SELECT * FROM exercises WHERE id = $1", [id]);
      if (exercise.rows.length === 0) {
        throw new Error(`Exercise with id ${id} not found.`);
      }
      return exercise.rows[0];
    } catch (error) {
      console.log("Error in findById:", error.message);
      throw error;
    }
  },
  
  update: async (id, data) => {
    // Update an exercise record dynamically based on provided fields
    try {
      let setClause = [];
      let values = [];
      let paramIndex = 1;

      // Only add fields that are provided in the data
      if (data.name) {
        setClause.push(`name = $${paramIndex}`);
        values.push(data.name);
        paramIndex++;
      }
      if (data.description) {
        setClause.push(`description = $${paramIndex}`);
        values.push(data.description);
        paramIndex++;
      }
      console.log(paramIndex);
      if (data.video_url) {
        setClause.push(`video_url = $${paramIndex}`);
        values.push(data.video_url);
        paramIndex++;
      }
      if (data.created_by) {
        setClause.push(`created_by = $${paramIndex}`);
        values.push(data.created_by);
        paramIndex++;
      }
      console.log(paramIndex);
      if (data.is_public !== undefined) {
        setClause.push(`is_public = $${paramIndex}`);
        values.push(data.is_public);
        paramIndex++;
      }

      // Ensure there's at least one field to update
      if (setClause.length === 0) {
        throw new Error('No valid fields provided for update.');
      }

      // Add the ID for the WHERE clause
      values.push(id);
      const query = `UPDATE exercises SET ${setClause.join(', ')} WHERE id = $${paramIndex} RETURNING *`;
    

      const updatedExercise = await pool.query(query, values);
      if (updatedExercise.rows.length === 0) {
        throw new Error(`Exercise with id ${id} not found.`);
      }

      return updatedExercise.rows[0];

    } catch (error) {
      console.log("Error in update:", error.message);
      throw error;
    }
  },
  
  delete: async (id) => {
    // Delete an exercise record by ID
    try {
      const deletedExercise = await pool.query(
        "DELETE FROM exercises WHERE id = $1 RETURNING *", 
        [id]
      );
      if (deletedExercise.rows.length === 0) {
        throw new Error(`Exercise with id ${id} not found.`);
      }
      return deletedExercise.rows[0];
    } catch (error) {
      console.log("Error in delete:", error.message);
      throw error;
    }
  },
};

module.exports = Exercise;

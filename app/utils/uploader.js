const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const Exercise = require('../models/exercise');  // Adjust this path to your exercise model

const uploadExercisesFromCSV = async (csvFilePath) => {
  try {
    const exercises = [];

    // Read the CSV file and parse it
    fs.createReadStream(csvFilePath)
      .pipe(csv())  // Pipe to csv-parser
      .on('data', (row) => {
        // Assuming your CSV has 'name', 'description', 'created_by' columns
        const exercise = {
          name: row.name,
          description: row.description,
          created_by: row.created_by,
        };
        exercises.push(exercise);
      })
      .on('end', async () => {
        // Once all rows are parsed, upload to the database
        try {
          for (const exercise of exercises) {
            await Exercise.create(exercise);  // Create each exercise in the database
          }
          console.log('CSV upload complete');
        } catch (error) {
          console.error('Error inserting exercises:', error.message);
        }
      })
      .on('error', (error) => {
        console.error('Error reading the CSV file:', error.message);
      });
  } catch (error) {
    console.error('Error processing CSV upload:', error.message);
  }
};

// Example: Call the function with the correct path to your CSV file
const csvFilePath = path.join(__dirname, '/uplaodFiles/Exercise_Data - Sheet1.csv');
uploadExercisesFromCSV(csvFilePath);

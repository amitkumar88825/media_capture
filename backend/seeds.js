const mongoose = require('mongoose');
const fs = require('fs');
const Job = require('./schema'); // Adjust this path if necessary

// MongoDB connection
mongoose
  .connect("mongodb+srv://panditup571:0sUpbHyYnPNwEODH@traveller.fjilx.mongodb.net/?retryWrites=true&w=majority&appName=traveller", {})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Read JSON file
let jobsData = JSON.parse(fs.readFileSync('./jobsData.json', 'utf-8'));

// Convert postedDateTime to Date format and ensure country is not empty
jobsData = jobsData.filter(job => {
  // Convert postedDateTime to a valid Date object
  if (job.postedDateTime && typeof job.postedDateTime === 'object' && job.postedDateTime.$date) {
    job.postedDateTime = new Date(job.postedDateTime.$date); // Convert to Date object
  }

  // Ensure country is not empty
  if (!job.country || job.country.trim() === '') {
    job.country = 'Unknown'; // Set a default value or skip the job
  }

  // Ensure jobId is numeric
  if (!parseInt(job['Job ID (Numeric)'])) return;
  job.jobId = parseInt(job['Job ID (Numeric)']);

  return job;
});

// Insert data into MongoDB
const importData = async () => {
  try {
    // Delete existing data from the collection
    await Job.deleteMany({});
    console.log('Collection cleared.');

    // Insert new data
    await Job.insertMany(jobsData);
    console.log('Data successfully imported');
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    mongoose.connection.close();
    process.exit();
  }
};

importData();

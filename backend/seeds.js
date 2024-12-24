const mongoose = require('mongoose');
const fs = require('fs');
const Job = require('./schema');  // Adjust this path if necessary

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/mployeee', {

}).then(() => {
  console.log('MongoDB connected');
}).catch(err => console.error('MongoDB connection error:', err));

// Read JSON file
let jobsData = JSON.parse(fs.readFileSync('./jobsData.json', 'utf-8'));

// Convert postedDateTime to Date format and ensure country is not empty
jobsData = jobsData.filter(job => {
  // Convert postedDateTime to a valid Date object
  if (job.postedDateTime && typeof job.postedDateTime === 'object' && job.postedDateTime.$date) {
    job.postedDateTime = new Date(job.postedDateTime.$date);  // Convert to Date object
  }

  // Ensure country is not empty
  if (!job.country || job.country.trim() === '') {
    job.country = 'Unknown'; // You can set a default value or skip the job if you prefer
  }

  if(!parseInt(job['Job ID (Numeric)'])) return
  else job.jobId = parseInt(job['Job ID (Numeric)'])  

  return job;
});


// Insert data into MongoDB
const importData = async () => {
  try {
    await Job.insertMany(jobsData);
    console.log('Data successfully imported');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error importing data:', error);
    mongoose.connection.close();
  }
};

importData();

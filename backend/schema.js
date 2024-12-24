const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  job_link: {
    type: String,
    required: true
  },
  seniority_level: {
    type: String,
    required: true
  },
  employment_type: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  company_url: {
    type: String,
    required: true
  },
  companyImageUrl: {
    type: String
  },
  postedDateTime: {
    type: Date,
    required: true
  },
  min_exp: {
    type: Number,
    required: true
  },
  max_exp: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  companytype: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;

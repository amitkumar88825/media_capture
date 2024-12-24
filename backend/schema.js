const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobId: {
    type: Number,
    required: true,
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
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(v),
      message: 'Invalid job link URL'
    }
  },
  seniority_level: {
    type: String,
    default: null
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
    default: null,
    validate: {
      validator: (v) => v ? /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(v) : true,
      message: 'Invalid company URL'
    }
  },
  companyImageUrl: {
    type: String,
    default: 'https://via.placeholder.com/150',
    validate: {
      validator: (v) => /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(v),
      message: 'Invalid company image URL'
    }
  },
  postedDateTime: {
    type: Date,
    required: true
  },
  min_exp: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v <= this.max_exp;
      },
      message: 'min_exp must be less than or equal to max_exp'
    }
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
    default: null
  }
}, {
  timestamps: true
});

// Create Model
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;

import React, { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]); 
  const [selectedJob, setSelectedJob] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    getAllJobs();
  }, []);

  const getAllJobs = async (location = "") => {
    try {
      const response = await axios.get("https://employee-me-xh9t.onrender.com/api/jobs", {
        params: { location }, 
      });
      setJobs(response.data.jobs);
      setSelectedJob(response.data.jobs[0] || null); 
    } catch (error) {
      console.error("Error fetching jobs: ", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    getAllJobs(query); // Fetch filtered jobs from the backend
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar: Job List */}
      <div className="w-1/3 bg-white shadow-md overflow-y-auto">
        <h2 className="text-lg font-bold p-4 border-b">Job Listings</h2>
        <input
          type="text"
          placeholder="Search by location"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border-b outline-none"
        />
        <ul>
          {jobs.map((job) => (
            <li
              key={job._id} // Use a unique key, like _id
              onClick={() => setSelectedJob(job)}
              className={`p-4 border-b cursor-pointer hover:bg-gray-200 ${
                selectedJob?._id === job._id ? "bg-gray-200" : ""
              }`}
            >
              <h3 className="text-md font-semibold text-blue-600">{job.title}</h3> {/* Blue-colored job title */}
              <p className="text-sm text-gray-600">
                {job.company} - {job.location}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(job.postedDateTime).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content: Job Details */}
      <div className="w-2/3 bg-white shadow-md p-6 overflow-y-auto">
        {selectedJob ? (
          <>
            <h2 className="text-2xl font-bold mb-4">{selectedJob.title}</h2>
            <p className="text-md text-gray-600 font-semibold">{selectedJob.company}</p>
            <p className="text-sm text-gray-500 mb-2">{selectedJob.location}</p>
            <p className="text-lg font-semibold text-blue-600 mb-4">
              {selectedJob.salary || "Salary not provided"}
            </p>
            <p className="text-gray-700">{selectedJob.details || "Details not provided"}</p>
          </>
        ) : (
          <p>No Jobs Found</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;

import React, { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    getAllJobs();
  }, []);

  const getAllJobs = async (location = "") => {
    setIsLoading(true); 
    try {
      const response = await axios.get("http://192.168.31.145:5000/api/jobs", {
        params: { location },
      });

      setJobs(response.data.jobs);
      setSelectedJob(response.data.jobs[0] || null);
    } catch (error) {
      console.error("Error fetching jobs: ", error);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    getAllJobs(query); 
  };

  const handleShare = (job) => {
    const shareText = `Check out this job: ${job.title} at ${job.company} in ${job.location}`;
    if (navigator.share) {
      navigator.share({
        title: "Job Listing",
        text: shareText,
        url: window.location.href,
      }).catch((err) => console.error("Error sharing:", err));
    } else {
      alert("Sharing is not supported in your browser.");
    }
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
        {isLoading ? ( 
          <div className="p-4 text-center text-gray-500">Loading jobs...</div>
        ) : (
          <ul>
            {jobs.map((job) => (
              <li
                key={job._id} 
                onClick={() => setSelectedJob(job)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-200 ${
                  selectedJob?._id === job._id ? "bg-gray-200" : ""
                }`}
              >
                <h3 className="text-md font-semibold text-blue-600">{job.title}</h3>
                <p className="text-sm text-gray-600">
                  {job.company} - {job.location}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(job.postedDateTime).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right Content: Job Details */}
      <div className="w-2/3 bg-white shadow-md p-6 overflow-y-auto">
        {selectedJob ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
              <button
                onClick={() => handleShare(selectedJob)}
                className="text-pink-600 bg-pink-100 hover:bg-pink-200 px-3 py-1 rounded-full text-sm flex items-center"
              >
                <span className="material-icons">share</span> {/* Share Icon */}
              </button>
            </div>
            <button
              className="text-white bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-lg mb-4"
            >
              Replay
            </button>
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

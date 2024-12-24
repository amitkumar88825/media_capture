const Job = require("./schema.js");

// Get all jobs
const getAllJobs = async (req, res) => {
    try {
        const { location } = req.query;

        const query = location ? { location: { $regex: location, $options: 'i' } } : {};

        const jobs = await Job.find(query);
        res.status(200).json({ success: true, jobs });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch jobs",
            error: error.message
        });
    }
};




module.exports = {
    getAllJobs,
};

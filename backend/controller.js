const getAllJobs = (req, res) => {
    try {
        console.log(3, ' api for get all jobs')


    } catch (error) {
        console.error(error)
    }
}


const findJobBySearch = (req, res) => {
    try {
        console.log(12, 'api for search jobs')


    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getAllJobs,
    findJobBySearch
}
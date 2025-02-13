const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    console.log(6 , 'middle ware')

    if (!token) return res.status(401).json({ message: "Access Denied" });
    console.log(6 , token)
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log(13 )
        console.log(10 , verified);
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = verifyToken;
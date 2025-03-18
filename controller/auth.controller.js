const users = require("../models/user.model");

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users.findOne({email})
        if(!user){
            return res.status(404).json({ error:"User not found"})
        }
        if (password !== user.password) {
            return res.status(403).json({ error:"Invalid Password"})
        }

        return res.status(200).json({ message:"loggedin successfully"})
    } catch (error) {
        console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
    }
}

module.exports = {
    login
}
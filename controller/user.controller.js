const users = require("../models/user.model");

const register = async(req, res) => {
    try {
        const { first_name, last_name, user_name, email, phone_number, password, role} = req.body;

        // we can hash the password and save it in the hashed format.
        
        const user = new users({
            first_name,
            last_name,
            email,
            user_name,
            phone_number,
            password,
            role
        })

        await user.save()

        return res.status(201).json({ message: 'user created successfully '})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message:"Internal Server Error", error: error })
    }
}

const listUser = async(req, res) => {
    try {
        const list = await users.find({},{password:0})

        if(!list){
            return res.status(404).json({ error: 'users not found '})
        }

        return res.status(200).json({ message: 'user fetched successfully', list })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message:"Internal Server Error", error: error })
    }
}

const updateUser = async(req, res) => {
    try {
        const { first_name, last_name, email, user_name, phone_number, password } = req.body;
        
        const user = await users.findOne({ email })

        if(!user){
            return res.status(404).json({ error: 'user not found '})
        }

        if (first_name) user.first_name = first_name
        if (last_name) user.last_name = last_name
        if (email) user.email = email
        if (user_name) user.user_name = user_name
        if (phone_number) user.phone_number = phone_number
        if (password) user.password = password

        await user.save()

        return res.status(200).json({ message: 'user updated successfully', user})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message:"Internal Server Error", error: error })
    }
}

const deleteUser = async(req, res) => {
    try {
        const { email } = req.body;
        
        const user = await users.findOneAndDelete({ email })

        if(!user){
            return res.status(404).json({ error: 'user not found '})
        }

        return res.status(200).json({ message: 'user deleted successfully '})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message:"Internal Server Error", error: error })
    }
}


module.exports = {
    register,
    updateUser,
    deleteUser,
    listUser
}
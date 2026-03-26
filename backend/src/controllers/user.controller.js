import { User } from "../models/user.model.js";

const createUser = async (req, res) => {

    const {username, email, fullname, avatar, password} = req.body;

    const user = await User.create({
        username,
        email,
        fullname,
        avatar,
        password
    });

    console.log("Created At:", user.createdAt);
    console.log("Updated At:", user.updatedAt);

    res.json(user);
};

export { createUser };
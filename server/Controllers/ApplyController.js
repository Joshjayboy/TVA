import asyncHandler from "express-async-handler";
import User2 from "../Models/ApplyModel.js";

// apply for internship
const applyUser = asyncHandler(async (req, res) => {
  const { firstname, middlename, lastname, email } = req.body;

  try {
    // create user in DB
    const user2 = await User2.create({
      firstname,
      middlename,
      lastname,
      email,
    });

    // if user created successfully send user data and token to client
    if (user2) {
      res.status(201).json({
        _id: user2._id,
        firstname: user2.firstname,
        email: user2.email,
        middlename: user2.middlename,
        lastname: user2.lastname,
        isAdmin: user2.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { applyUser };

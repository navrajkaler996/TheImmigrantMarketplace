import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

/////CONSTANTS AND UTILS
import { errorMessages } from "../constants.js";
import generateToken from "../utils/generateToken.js";

/////CREATING ACCOUNT FOR USER
//POST @ /api/user/createaccount
export const createAccount = asyncHandler(async (req, res) => {
  const { fullName, email, mobileNumber, password, city, isAdmin, type } =
    req.body;

  /////CHECK IF USER ALREADY EXISTS OR NOT
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).send({
      message: errorMessages.USER_EXISTS,
    });
  }

  /////IF NOT, CREATE A NEW ONE
  const user = await User.create({
    fullName,
    email,
    mobileNumber,
    password,
    city,
    isAdmin,
    type,
  });

  if (user) {
    res.status(201).json({
      message: "Account created successfully!",
      status: 201,
    });
  } else {
    res.status(400);
    throw new Error(errorMessages.USER_INVALID_DATA);
  }
});

/////USER SIGN IN
//POST @ /api/user/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  /////CHECK IF USER ALREADY EXISTS OR NOT
  const userExists = await User.findOne({ email });

  /////IF YES, CHECK IF PASSWORD MATCHES OR NOT
  if (userExists) {
    if (password === userExists.password) {
      res.status(200).json({
        _id: userExists._id,
        fullName: userExists.fullName,
        email: userExists.email,
        mobileNumber: userExists.mobileNumber,
        password: userExists.password,
        isAdmin: userExists.isAdmin,
        type: userExists.type,
        /////Passing JWT token to the client-side everytime
        //the user signs in
        token: generateToken(userExists._id),
      });
    } else {
      res.status(401).json({
        message: errorMessages.PASSWORD_DO_NOT_MATCH,
      });
    }
  } else {
    res.status(404).json({
      message: errorMessages.USER_INVALID_DATA,
    });
  }
});

export const getUserNames = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  const user = await User.findMany({
    
  });

  if (user) {
    res.status(200).json({ name: user.fullName });
  } else {
    res.status(400).json({
      message: errorMessages.USER_NOT_FOUND,
    });
  }
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error(errorMessages.USER_NOT_FOUND);
  }
});

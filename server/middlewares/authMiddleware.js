import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

import { errorMessages } from "../constants.js";

const protect = asyncHandler(async (req, res, next) => {
  try {
    /////Using bearer token to authorize the user.
    //Bearer token will be recieved from the client-side.
    //It will be present in the headers
    const bearerToken = req?.headers?.authorization;
    if (bearerToken?.startsWith("Bearer")) {
      const token = bearerToken.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      /////Appending the request body with the user data.
      //password is not appended.
      req.user = await User.findById({ _id: decoded?.id + "" }).select(
        "-password"
      );

      next();
    } else {
      res.status(404);
      throw new Error(errorMessages.TOKEN_NOT_FOUND);
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error(errorMessages.TOKEN_INVALID);
  }
});

export default protect;

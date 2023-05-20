import jwt from "jsonwebtoken";
import { httpError } from "../utils/HttpError.js";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers('Authorization');
    if(!token){
        return res.status(403).send({message: "no token provided"})
    }
    if(token.startsWith('Bearer ')){
        token = token.slice(7, token.length).trimLeft();
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verify;
    next();

  } catch (error) {
    httpError(res, error, 500);
  }
};

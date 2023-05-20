import User from "../models/User.js";
import { httpError } from "../utils/HttpError.js";

/*read routes */

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    httpError(res, error, 500);
  }
};

export const getUserFriends = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const friends = await Promise.all(
    user.friends.map((id) => user.findById(id))
  );

  const formattedFriends = friends.map(
    ({ _id, firstname, lastname, ocupation, location, picturePath }) => {
      return { _id, firstname, lastname, ocupation, location, picturePath };
    }
  );
    res.status(200).json(formattedFriends);
};

export const addRemoveFriend = async (req, res) => {}
